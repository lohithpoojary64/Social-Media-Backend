import { v2 as cloudnary } from "cloudinary";
import fs from "fs";

//here my task is to save videos and photos in local storage temporarly and then move it to cloudnary storage.

//At first I need to config cloudinary

cloudnary.config({
  cloud_name: "Lohith",
  api_key: "123",
  api_secret: "12345",
});

const SaveFilesOnCloudinary = async function (file) {
  //Now uploading files in cloudnary
  try {
    if(!file) return null
    let response = await cloudnary.uploader.upload(
      file,
      {
        public_id: "1",
      }
    );
    console.log('File is stored in cloudnary successully',response.url);
  } catch (error) {
    fs.unlinkSync(file)
    console.log('Error occured while storing files in cloudinary');
    
  }
};
