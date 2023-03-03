import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

aws.config.update({
    region: 'ap-south-1',
    secretAccessKey: 'HEtnpU67OsQdN86Y5dnZMzrq7g+8HNGJaBNlOvHP',
    accessKeyId: 'AKIA4X6QLQSPH7FEYEWV'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'digibox-portal',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

export default upload;