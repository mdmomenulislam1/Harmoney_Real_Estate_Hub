import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import swal from 'sweetalert';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const AddProperty = () => {
  const { user } = useContext(AuthContext);
  // const {register, handleSubmit, reset } = useForm()

  //   const onSubmit = async (data) => {
  //     console.log(data)
  //     // image upload to imgbb and then get an url
  //     const imageFile = { image: data.image[0]  }
  //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
  //         headers: {
  //             'content-type': 'multipart/form-data'
  //         }
  //     });
  //     if (res.data.success) {
  //         // now send the menu item data to the server with the image url
  //         const propertyData = {
  //           property_title,
  //           property_image,
  //           property_location,
  //           agent_name,
  //           agent_email,
  //           agent_image: user?.photoURL,
  //           price_range,
  //           verification_status: "Pending",
  //           property_description
  //         }
  //         // 
  //         const propertyRes = await axiosSecure.post('/property', propertyData);
  //         console.log(property.data)
  //         if(propertyRes.data.insertedId){
  //             // show success popup
  //             reset();
  //             Swal.fire({
  //                 position: "top-end",
  //                 icon: "success",
  //                 title: `${data.name} is added to the menu.`,
  //                 showConfirmButton: false,
  //                 timer: 1500
  //               });
  //         }
  //     }
  //     console.log( 'with image url', res.data);
  // };




  // const [img, setImg] = useState(null);



  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


  const handleAddProperty = async (e) => {
    e.preventDefault();
    const form = e.target;
    const property_title = form.property_title.value;
    const property_image = form.property_image.value;
    const property_location = form.property_location.value;
    const agent_name = form.agent_name.value;
    const agent_email = form.agent_email.value;
    const price_range = form.price_range.value;
    const property_description = form.property_description.value;

    const propertyData = {
      property_title,
      property_image,
      property_location,
      agent_name,
      agent_email,
      agent_image: user?.photoURL,
      price_range,
      verification_status: "Pending",
      property_description
    }

    fetch('http://localhost:5000/property', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          swal("Okay, Done!", "Property added successfully!", "success");
        }
      });
  }


  return (
    <div>
      <h2 className="text-2xl">App A Property</h2>
      <form onSubmit={handleAddProperty} action="" method="post" className="w-full text-center">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center items-center w-full">
            <p className="text-black font-bold w-[200px]">Property Title</p>

            <input type="text" name="property_title" id="" placeholder="Property Title" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Photo URL</p>
            <input type="file" name="property_image" id="" placeholder="Property Photo URL" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Location</p>
            <input type="text" name="property_location" id="" placeholder="Property Location" required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
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
            <input type="text" name="price_range" id="" required placeholder="Lowest-Highest (10000-50000)" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Description</p>
            <textarea type="text" name="property_description" id="" required placeholder="Property Description" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <br />
        </div>
        <button className=" bg-yellow-600 hover:bg-yellow-800 m-3 w-3/4 p-3 text-white font-bold border rounded-lg" type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;