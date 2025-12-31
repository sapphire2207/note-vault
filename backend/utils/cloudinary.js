import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) return null;

    try {
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return result;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        console.error("Cloudinary upload failed:", error);
        throw error;
    }
};

const deleteOnCloudinary = async (public_id, resource_type = "image") => {
    try {
        if (!public_id) return null;

        await cloudinary.uploader.destroy(public_id, {
            resource_type,
        });
    } catch (error) {
        console.log("delete on cloudinary failed", error);
        return error;
    }
};

export { uploadOnCloudinary, deleteOnCloudinary };
