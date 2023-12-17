import React from 'react';
import axios from 'axios';

const Card = ({ id, title, description, image }) => {
    const handleDelete = async () => {
        try {
          // Send the request to the Flask API to delete the image
          const response = await axios.delete(`http://localhost:5000/api/delete-image/${id}`);
          console.log(response.data);
    
          window.location.reload()
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      };
    return (
        <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-lg" src={`data:image/jpeg;base64,${image}`} alt="" />
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
            </div>
            <button type="button" onClick={handleDelete} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
        </div>
    );
};

export default Card;