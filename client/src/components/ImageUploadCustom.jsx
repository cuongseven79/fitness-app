import React, { useRef, useState, useEffect } from 'react';

const ImageUploader = ({ defaultImage, onUrlImages }) => {
    const inputRef = useRef();
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        onUrlImages(selectedImages);
    }, [selectedImages, onUrlImages]);

    function handleImageChange(e) {
        if (e.target.files) {
            setSelectedImages([...e.target.files]);
        }
    }

    function handleRemoveImage() {
        setSelectedImages([]);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const imageSource = selectedImages.length > 0 ? URL.createObjectURL(selectedImages[0]) : defaultImage;

    return (
        <div className='flex flex-col'>
            <div className="relative ">
                <div className="w-max relative">
                    <img className="cursor-pointer border border-gray-400 w-56 h-56 before:bg-gray-100 before:absolute before:inset-0 before:border-dashed before:duration-300 hover:before:scale-105 active:before:scale-95"
                        alt="file upload icon"
                        src={imageSource}
                    />
                </div>
                <input
                    ref={inputRef}
                    className="bg-red-100 absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                />
            </div>
            {selectedImages.length > 0 &&
                <button className="bg-red-500 py-1 my-2 rounded-lg" onClick={handleRemoveImage}>Remove</button>
            }
        </div>
    );
}

export default ImageUploader;