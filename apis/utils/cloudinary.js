import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFiles = async (files, type, path) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `Feed-app/${path}`,
            public_id: `${type}_${Date.now()}`,
            quality: 70,
            resource_type: "auto",
            eager: [
              { width: 720, height: 480, crop: "limit", format: "mp4" },
            ],
            eager_async: true,
          },
          (error, uploadedFile) => {
            if (error) return reject(error);
            return resolve(uploadedFile.url);
          }
        )
        .end(file.buffer);
    });
  });

  const fileUrls = await Promise.all(uploadPromises);

  return fileUrls; 
};
