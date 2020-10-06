import boto3
import os

#s3 is used for uploading files
s3 = boto3.client('s3', region_name='us-west-2', aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'), 
                    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'))

# grabs all buckets
response = s3.list_buckets()

# Iterate over Buckets from response
for bucket in response['Buckets']:
  
  	# Print the Name for each bucket
    print(bucket['Name'])

# def singlePublicFileUpload(file)
  # const { originalname, mimetype, buffer } = file
  # const path = require("path");
  # print(file)
  # // name of the file in your S3 bucket will be the date in ms plus the extension name
  # const Key = new Date().getTime().toString() + path.extname(originalname);
  # const uploadParams = {
  #   Bucket: NAME_OF_BUCKET,
  #   Key,
  #   Body: buffer,
  #   ACL: "public-read"
  # };
  # const result = await s3.upload(uploadParams).promise();

  # // save the name of the file in your bucket as the key in your database to retrieve for later
  # return result.Location;
# };

# Upload database.py with key 2019/final_report_01_01.csv
# s3.upload_file(Bucket='capstone-project-steven', 
#             #    Set filename and key
#                Filename='database.py', 
#                Key='2019/final_report_01_01.csv')

# Get object metadata and print it
# response = s3.head_object(Bucket='capstone-project-steven', 
                    #    Key='2019/final_report_01_01.csv')

# Print the size of the uploaded object
# print(response['ContentLength'])

# List only objects that start with '2018/final_'
# response = s3.list_objects(Bucket='capstone-project-steven', 
#                            Prefix='2018/final_')

# Iterate over the objects
# if 'Contents' in response:
#   for obj in response['Contents']:
#       # Delete the object
#       s3.delete_object(Bucket='gid-staging', Key=obj['Key'])

# # Print the remaining objects in the bucket
# response = s3.list_objects(Bucket='gid-staging')

# for obj in response['Contents']:
#   	print(obj['Key'])