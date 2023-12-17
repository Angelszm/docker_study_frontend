import axios from 'axios';
import React, { useState } from 'react';

const NewForm = ({ onSubmit }) => {
  const [title, settitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(file){
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setImage(base64String)
        }
        reader.readAsDataURL(file)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
        const response = await axios.post("http://localhost:5000/api/upload-image", {
            title,
            description,
            image
        })

        console.log(response.data)
        window.location.reload()
    }catch(error){
        console.error('Error', error)
    }
   
    // Clear the form fields
    settitle('');
    setDescription('');
    setImage(null)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Image Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          accept="image/*"
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewForm;
