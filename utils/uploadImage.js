import AWS from 'aws-sdk';
import {S3_BUCKET} from '../config';

const uploadImage = async file => {
  return new Promise(async (resolve, reject) => {
    const s3Bucket = new AWS.S3({
      accessKeyId: S3_BUCKET.ACCESS_KEY_ID,
      secretAccessKey: S3_BUCKET.SECRET,
    });

    const contentType = file.type;
    const fileName = file.fileName;

    const params = {
      Bucket: S3_BUCKET.BUCKETNAME,
      Key: fileName,
      Body: file.uri,
      ContentType: contentType,
    };
    s3Bucket.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

export default uploadImage;
