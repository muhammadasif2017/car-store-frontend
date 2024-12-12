import axios from "axios";
import { BASE_URL } from "../utils/constant";

const apiUrl = `${BASE_URL}/api/cars/`;

const getAllCars = () => {
  const request = axios.get(apiUrl);
  return request.then((response) => response.data);
};

const createCar = (newObject) => {
  const request = axios.post(apiUrl, newObject);
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
