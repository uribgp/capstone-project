import logging
import boto3
import os
from botocore.exceptions import ClientError


REGION_NAME = os.environ.get('AWS_REGION_NAME')

class AwsS3UploadClass(object):

  def __init__(self, id_key, secret_key, bucket_name):
    self.id_key = id_key
    self.secret_key = secret_key
    self.bucket_name = bucket_name

    self.client = boto3.client('s3',
                                endpoint_url=None,
                                aws_access_key_id=self.id_key,
                                aws_secret_access_key=self.secret_key,
                                region_name=REGION_NAME
                                )


  def get_bucket(self, bucket_name):
    try:
        bucket = self.client.get_bucket(bucket_name)
    except ClientError as e:
        bucket = None
    return bucket

  def create_presigned_post(self, object_name,
                            fields=None, conditions=None, expiration=3600):
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_post(self.bucket_name,
                                                      object_name,
                                                      Fields=fields,
                                                      Conditions=conditions,
                                                      ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None
    return response

  def create_presigned_url(self, object_name, expiration=3600):
    s3_client = boto3.client('s3')
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': self.bucket_name,
                                                            'Key': object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response