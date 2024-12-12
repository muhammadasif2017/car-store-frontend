"use client";

import React, { useState } from "react";
import carServices from "@/services/car-api";

export default function CarForm() {
  const [formData, setFormData] = useState({
    carModel: "",
    price: "",
    phone: "",
    city: "",
    maxPictures: 1,
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, formData.maxPictures);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) return setError("Unauthorized");

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    images.forEach((image) => form.append("images", image));
    form.append("token", token);

    try {
      await carServices.createCar(form);
      alert("Car listing submitted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <h2>Submit Car Details</h2>
      <input
        type="text"
        name="carModel"
        onChange={handleChange}
        placeholder="Car Model"
        required
        minLength={3}
      />
      <input
        type="number"
        name="price"
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="phone"
        onChange={handleChange}
        placeholder="Phone (11 digits)"
        required
        minLength={11}
        maxLength={11}
      />
      <input
        type="text"
        name="city"
        onChange={handleChange}
        placeholder="City"
        required
      />
      <input
        type="number"
        name="maxPictures"
        onChange={handleChange}
        placeholder="Max Pictures"
        min={1}
        max={10}
        required
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*"
        disabled={images.length >= Number(formData.maxPictures)}
      />
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <div className="thumbnail" key={index}>
            <img
              src={URL.createObjectURL(image)}
              alt={`Thumbnail ${index + 1}`}
            />
            <div
              className="delete-icon"
              onClick={() => handleImageRemove(index)}
              title="Remove Image"
            >
              🗑️
            </div>
          </div>
        ))}
      </div>
      <button type="submit">Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
