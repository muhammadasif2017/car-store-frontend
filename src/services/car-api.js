import axios from "axios";
const baseUrl = "http://localhost:3001/api/cars/";

const getAllCars = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createCar = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      // this is the way to access the error message
      console.log(error.response.data.error);
      throw error.response.data.error;
    });
};

const carServices = {
  getAllCars,
  createCar,
};

export default carServices;
