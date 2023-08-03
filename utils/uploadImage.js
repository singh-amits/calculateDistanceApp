// import {RNS3} from 'react-native-aws3';
// import {S3_BUCKET} from '../config';
// import {Alert} from 'react-native';

// const uploadImage = profilePicture => {
//   const file = {
//     uri: profilePicture.uri,
//     name: profilePicture.fileName,
//     type: 'image/jpg' || 'image/png',
//   };
//   const options = {
//     keyPrefix: 'image-uploads/',
//     bucket: S3_BUCKET.BUCKETNAME,
//     region: S3_BUCKET.REGION,
//     accessKey: S3_BUCKET.ACCESS_KEY_ID,
//     secretKey: S3_BUCKET.SECRET,
//     successActionStatus: 201,
//   };

//   console.log(file, 'file', options);

//   try {
//     const resp = RNS3.put(file, options);
//     console.log(resp);
//   } catch (error) {
//     const resp = RNS3.put(file, options);
//     console.log(error, 'error', resp);
//   }
//   // RNS3.put(file, options).then(response => {
//   //   console.log(response, 'response');
//   //   if (response.status !== 201)
//   //     throw new Error('Failed to upload image to S3');
//   //   console.log(response.body, 'body');
//   // });
// };

// export default uploadImage;
