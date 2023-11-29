import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Firebase/AuthProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;

const UpdatedProperty = () => {
  const property = useLoaderData();
  const { _id, property_image, property_title, agent_name, agent_image, property_description, property_location, price_range, verification_status } = property;

  const {user} = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    const form = e.target;

    const property_title = form.property_title.value;
    const property_location = form.property_location.value;
    const agent_name = form.agent_name.value;
    const agent_email = form.agent_email.value;
    const price_range = form.price_range.value;
    const property_description = form.property_description.value;

    try {
      const formData = new FormData();
      formData.append('image', image);
      const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: image_hosting_key, 
        },
      });

      const property_image = imgbbResponse.data.data.url;

      const propertyData = {
        property_title,
        property_image,
        property_location,
        agent_name,
        agent_email,
        agent_image,
        price_range,
        verification_status,
        property_description,
      };

      const serverResponse = await fetch(`http://localhost:5000/property/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });

      const responseData = await serverResponse.json();

      if (responseData.acknowledged) {
        swal("Okay, Done!", "Property Updated successfully!", "success");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="my-5">
      <Helmet>
        <title>{'HRE-hub || Update Property'}</title>
      </Helmet>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Property Update Page</h2>
      <form onSubmit={handleUpdateProperty} action="" method="post" className="w-full text-center border-x-4 border-b-4 rounded-lg border-blue-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center items-center w-full">
            <p className="text-black font-bold w-[200px]">Property Title</p>

            <input type="text" name="property_title" defaultValue={property_title} id="" placeholder="Property Title" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Photo URL</p>
            <input type="file" onChange={handleImageChange} name="property_image"  id="" placeholder="Property Photo URL" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Location</p>
            <input type="text" name="property_location" defaultValue={property_location} id="" placeholder="Property Location" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Agent Name</p>
            <input type="text" name="agent_name" id="" defaultValue={user?.displayName} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Agent Email</p>
            <input type="text" name="agent_email" id="" defaultValue={user?.email} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>


          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Price Range ($)</p>
            <input type="text" name="price_range" defaultValue={price_range} id="" required placeholder="Lowest-Highest (10000-50000)" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Description</p>
            <textarea type="text" name="property_description" defaultValue={property_description} id="" required placeholder="Property Description" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <br />
        </div>
        <button className=" bg-blue-800 hover:bg-yellow-800 w-full p-3 text-white font-bold border rounded-lg" type="submit">Update Property</button>
      </form>

    </div>
  );
};

export default UpdatedProperty;