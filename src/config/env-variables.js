import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const ATLAS_URI = process.env.ATLAS_URI;
export const AWS_REGION = process.env.AWS_REGION;
export const BUCKET_NAME = process.env.BUCKET_NAME
export const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const PASSCODE = process.env.PASSCODE;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
