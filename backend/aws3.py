import boto3
import os

#s3 is used for uploading files
s3 = boto3.client('s3', region_name='us-west-1', aws_access_key_id=os.environ.get(AWS_ACCESS_KEY_ID), 
                    aws_secret_access_key=os.environ.get(AWS_SECRET_ACCESS_KEY))



# bucket is created to store files 
video_bucket = s3.create_bucket(Bucket='video-staging')

# grabs all buckets
response = s3.list_buckets()

# Iterate over Buckets from response
for bucket in response['Buckets']:
  
  	# Print the Name for each bucket
    print(bucket['Name'])

