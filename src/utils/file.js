import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_FOLDER = "Nodejs2025";

const uploadFile = async (files)=> {
    // console.log("File upload function")
    const uploadResults = [];
    for(const file of files){
        const result = await new Promise((resolve, reject)=>{
            cloudinary.uploader
            .upload_stream({
                folder: CLOUDINARY_FOLDER,
                }, (error, data)=>{
                    if(error) return reject(error);
                    resolve(data);
                })
                .end(file.buffer);

            uploadResults.push(result);
        })

    }
    return uploadResults;

}

export default uploadFile;