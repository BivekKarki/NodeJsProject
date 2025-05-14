import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_FOLDER = "Nodejs2025";

const uploadFile = async (file)=> {
    return await new Promise((resolve, reject)=>{
        cloudinary.uploader
        .upload_stream({
            folder: CLOUDINARY_FOLDER,
            }, (error, data)=>{
                if(error) return reject(error);
                resolve(data);
            })
            .end(file.buffer);
    })
}

export default uploadFile;