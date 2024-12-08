const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier'); // Necesario para convertir el buffer en stream

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });

    // Convertimos el buffer en stream y lo enviamos a Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

module.exports = { uploadImage };
