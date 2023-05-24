import { useState, useEffect } from "react";
import UploadService from "../services/file.upload.service";
import IFile from "../types/file";
import { boolean } from "yup";

const ImageUpload: React.FC<{ props: (file: File) => any }> = ({ props }) => {
    const [currentImage, setCurrentImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [imageInfos, setImageInfos] = useState<Array<IFile>>([]);

    useEffect(() => {
    }, []);

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files as FileList;
        setCurrentImage(selectedFiles?.[0]);
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
        setProgress(0);
        props(selectedFiles?.[0]);
    };

    return (
        <div>
            <div className="row">
                <div className="col-8">
                    <label className="btn btn-default p-0">
                        <input type="file" accept="image/*" onChange={selectImage} />
                    </label>
                </div>
            </div>

            {previewImage && (
                <div>
                    <img className="preview" src={previewImage} alt="" />
                </div>
            )}

            {message && (
                <div className="alert alert-secondary mt-3" role="alert">
                    {message}
                </div>
            )}

            {imageInfos.length > 0 && (
                <div className="card mt-3">
                    <div className="card-header">List of Images</div>
                    <ul className="list-group list-group-flush">
                        {imageInfos.map((img, index) => (
                            <li className="list-group-item" key={index}>
                                <p>
                                    <a href={img.url}>{img.name}</a>
                                </p>
                                <img src={img.url} alt={img.name} height="80px" />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;