import React, { useRef, useState, useEffect, useMemo } from 'react';
import { deleteImage, postProfile } from '../api/profileService';

const Image = ({ imageSource }) => (
    <div className="w-max relative">
        <img className="cursor-pointer border border-gray-400 w-56 h-56 before:bg-gray-100 before:absolute before:inset-0 before:border-dashed before:duration-300 hover:before:scale-105 active:before:scale-95"
            alt="file upload icon"
            src={imageSource}
        />
    </div>
);

const Input = ({ inputRef, onImageChange }) => (
    <input
        ref={inputRef}
        className="bg-red-100 absolute inset-0 opacity-0 cursor-pointer"
        type="file"
        onChange={onImageChange}
    />
);

const ImageUploader = ({ onUrlImages, defaultImage }) => {
    const inputRef = useRef();
    const [selectedImages, setSelectedImages] = useState([]);

    const imageSource = useMemo(() => {
        return selectedImages.length > 0 ? URL.createObjectURL(selectedImages[0]) : defaultImage;
    }, [selectedImages, onUrlImages]);

    const handleImageChange = async (e) => {
        if (e.target.files) {
            setSelectedImages([...e.target.files]);
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
            postProfile(formData);
        }
    }

    const handleRemoveImage = () => {
        if (selectedImages[0]) {
            const file = selectedImages[0];
            deleteImage(file.name);
            setSelectedImages([]);
        }
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <div className='flex flex-col'>
            <div className="relative ">
                <Image imageSource={imageSource} />
                <Input inputRef={inputRef} onImageChange={handleImageChange} />
            </div>
            {selectedImages.length > 0 &&
                <button className="bg-red-500 py-1 my-2 rounded-lg" onClick={handleRemoveImage}>Remove</button>
            }
        </div>
    );
}

export default ImageUploader;