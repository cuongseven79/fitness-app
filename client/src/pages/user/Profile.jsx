import React, { useState } from "react";
import ImageUploader from "../../components/ImageUploadCustom";
import DefaultCertImg from "../../images/cert-frame.png";
import UserDefaultImage from "../../images/user_profile.png";
import axios from "axios";


const FormField = ({ id, label, placeholder, value, onChange }) => (
    <li className="py-3 flex justify-between items-center gap-10">
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input type="text" id={id} value={value} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} />
    </li>
);

const Profile = () => {
    const [urlAvatar, setUrlAvatar] = useState(null);
    const [urlCerts, setUrlsCert] = useState(null);
    const [formState, setFormState] = useState({
        fullname: '',
        gender: '',
        age: '',
        experience: '',
        participant: '',
        price: ''
    });

    function handleChange(e) {
        setFormState({
            ...formState,
            [e.target.id]: e.target.value
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        if (urlAvatar) {
            formData.append('image', urlAvatar);
        }
        
        try {
            axios.post("http://localhost:3001/profile", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res.data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log("ERROR: " + error)
        }
    }
    // console.log("urlAvatar", urlAvatar)
    // console.log("urlcert", urlCerts)


    return (
        <section className="p-10 rounded-2xl bg-white container text-black">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1 className="text-2xl py-10 text-black m-auto">MY PROFILE</h1>
                <div className="flex justify-around">
                    <div>
                        <FormField id="fullname" label="Fullname:" placeholder="Fullname" value={formState.fullname} onChange={handleChange} />
                        <FormField id="gender" label="Gender:" placeholder="Gender" value={formState.gender} onChange={handleChange} />
                        <FormField id="age" label="Age" placeholder="Age" value={formState.age} onChange={handleChange} />
                        <FormField id="experience" label="Year of Experiences" placeholder="Year of Experiences" value={formState.experience} onChange={handleChange} />
                        <FormField id="participant" label="Number of participants" placeholder="Number of participants" value={formState.participant} onChange={handleChange} />
                        <FormField id="price" label="Price" placeholder="Price" value={formState.price} onChange={handleChange} />
                    </div>
                    <ImageUploader onUrlImages={setUrlAvatar} defaultImage={UserDefaultImage} />
                </div>
                <div className="w-1/2 flex justify-evenly m-auto">
                    <button type="submit" className="rounded-lg px-12 py-4 bg-blue-400 hover:bg-blue-500 text-white">Save </button>
                    <button type="reset" className="rounded-lg px-12 py-4 bg-gray-400 hover:bg-gray-500 text-white">Cancel</button>
                </div>
            </form>
            <h2 className="text-black flex justify-center py-5 ">Certificate</h2>
            <div className="overflow-auto flex justify-evenly gap-5">
                {Array(3).fill(
                    <ImageUploader onUrlImages={setUrlsCert} defaultImage={DefaultCertImg} />
                )}
            </div>
        </section>
    );
};

export default Profile;