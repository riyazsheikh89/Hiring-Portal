import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { AWS_SECRET_ACCESS_KEY, ACCESS_KEY_ID, BUCKET_NAME, AWS_REGION } from '../config/env-variables.js';

aws.config.update({
    region: AWS_REGION,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: ACCESS_KEY_ID
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString()+file.originalname.replace(/ /g,''));
            //store the file with the string datetime + original name having no white space
        }
    })
});

export {
    upload,
    s3
}