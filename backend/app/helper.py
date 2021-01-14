import logging
import boto3
import os
from botocore.exceptions import ClientError
from functools import wraps
from flask import request, g, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature

REGION_NAME = os.environ.get("AWS_REGION_NAME")
TWO_WEEKS = 1209600
FIFTEEN_MINUTES = 900
SECRET_KEY = os.environ.get("SECRET_KEY")

def generate_token(user, expiration=FIFTEEN_MINUTES):
    s = Serializer(SECRET_KEY, expires_in=expiration)
    token = s.dumps({
        'id': user.id,
        'email': user.email,
    }).decode('utf-8')
    return token


def verify_token(token):
    s = Serializer(SECRET_KEY)
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    return data


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token:
            string_token = token.encode('ascii', 'ignore')
            user = verify_token(string_token)
            if user:
                g.current_user = user
                return f(*args, **kwargs)

        return {"msg" : "Authentication is required to access this resource"}, 401

    return decorated

class AwsS3UploadClass(object):
    def __init__(self, id_key, secret_key, bucket_name):
        self.id_key = id_key
        self.secret_key = secret_key
        self.bucket_name = bucket_name

        self.client = boto3.client(
            "s3",
            endpoint_url=None,
            aws_access_key_id=self.id_key,
            aws_secret_access_key=self.secret_key,
            region_name=REGION_NAME,
        )

    def get_bucket(self, bucket_name):
        try:
            bucket = self.client.get_bucket(bucket_name)
        except ClientError as e:
            bucket = None
        return bucket

    def create_presigned_post(
        self, object_name, fields=None, conditions=None, expiration=3600
    ):
        s3_client = boto3.client("s3")
        try:
            response = s3_client.generate_presigned_post(
                self.bucket_name,
                object_name,
                Fields=fields,
                Conditions=conditions,
                ExpiresIn=expiration,
            )
        except ClientError as e:
            logging.error(e)
            return None
        return response

    def create_presigned_url(self, object_name, expiration=3600):
        s3_client = boto3.client("s3")
        try:
            response = s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.bucket_name, "Key": object_name},
                ExpiresIn=expiration,
            )
        except ClientError as e:
            logging.error(e)
            return None

        # The response contains the presigned URL
        return response


def filter_comment(comment, timed, general):
    if comment.timestamp is not None:
        timed.append(comment.to_dict())
    else:
        general.append(comment.to_dict())


def update_like_status(comments, timed, general):
    for result in comments:
        if isinstance(result, tuple):
            if result[1] is not None:
                result[0].like_status = result[1]
            filter_comment(result[0], timed, general)
        else:
            filter_comment(result, timed, general)
