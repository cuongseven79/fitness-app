import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getProfile = async () => {
  const response = await axios.get(API_URL + "/profile");
  return response.data;
}

export const postProfile = async (formData) => {
  const response = await axios.post(API_URL + "/profile", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}
export const deleteImage = async (imageName) => {
  const response = await axios.post(API_URL + "/profile/delete", { name: imageName });
  return response.data;
};
