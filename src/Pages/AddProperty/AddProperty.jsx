import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import swal from 'sweetalert';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import useUsers from '../../Hooks/useUsers';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [userInfo] = useUsers();
  const userData = userInfo?.filter((item) => item?.email === user?.email);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddProperty = async (e) => {
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
        agent_image: userData[0]?.profile,
        price_range,
        verification_status: "Pending",
        property_description,
      };

      const serverResponse = await fetch('https://server-site-psi-six.vercel.app/property', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });

      const responseData = await serverResponse.json();

      if (responseData.acknowledged) {
        swal("Okay, Done!", "Property added successfully!", "success");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="my-5">
      <Helmet>
        <title>{'HRE-hub || Add Property '}</title>
      </Helmet>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Add Property Page</h2>
      <form onSubmit={handleAddProperty} action="" method="post" className="w-full text-center border-x-4 rounded-lg border-b-4 border-blue-800	">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center items-center w-full">
            <p className="text-black font-bold w-[200px]">Property Title</p>

            <input type="text" name="property_title" id="" placeholder="Property Title" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Photo URL</p>
            <input type="file" onChange={handleImageChange} name="property_image" id="" placeholder="Property Photo URL" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Location</p>
            <input type="text" name="property_location" id="" placeholder="Property Location" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Agent Name</p>
            <input type="text" name="agent_name" id="" defaultValue={userData[0]?.name} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Agent Email</p>
            <input type="text" name="agent_email" id="" defaultValue={userData[0]?.email} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>


          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Price Range ($)</p>
            <input type="text" name="price_range" id="" required placeholder="Lowest-Highest (10000-50000)" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Description</p>
            <textarea type="text" name="property_description" id="" required placeholder="Property Description" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <br />
        </div>
        <button className=" bg-blue-800 hover:bg-yellow-800 w-full p-3 text-white font-bold border rounded-b-lg" type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;