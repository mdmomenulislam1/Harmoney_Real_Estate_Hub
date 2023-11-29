import axios from "axios";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import swal from "sweetalert";
// import { AuthContext } from "../Firebase/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;

const EditProfile = () => {
  const userInfo = useLoaderData([]);
  const { _id, 
    name,
    email,
    profile: profile_picture,
    role,
    profession,
    bod,
    bio,
    presentAddress,
    permanentAddress} = userInfo;
  console.log(_id);

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const profession = form.profession.value;
    const bod = form.bod.value;
    const bio = form.bio.value;
    const presentAddress = form.pre_address.value;
    const permanentAddress = form.per_address.value;

    try {
      const formData = new FormData();
      formData.append('image', image);
      const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
        params: {
          key: image_hosting_key, 
        },
      });

      const profile_picture = imgbbResponse.data.data.url;

      const profileData = {
        name,
        email,
        profile: profile_picture,
        role,
        profession,
        bod,
        bio,
        presentAddress,
        permanentAddress
      };

      const serverResponse = await fetch(`https://server-site-psi-six.vercel.app/user/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const responseData = await serverResponse.json();

      if (responseData.acknowledged) {
        swal("Okay, Done!", "Profile Updated successfully!", "success");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div className="my-5">
      <Helmet>
        <title>{'HRE-hub || Edit Profile'}</title>
      </Helmet>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Profile Update Page</h2>
      <form onSubmit={handleUpdateProfile} action="" method="post" className="w-full text-center border-x-4 border-b-4 rounded-lg border-blue-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center items-center w-full">
            <p className="text-black font-bold w-[200px]">Profile Name</p>

            <input type="text" name="name" defaultValue={name} id=""  required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Profile picture</p>
            <input type="file" onChange={handleImageChange} name="profile"  id=""  required className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Profession</p>
            <input type="text" 
            defaultValue={profession}
            name="profession"  id=""  className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Date Of Birth</p>
            <input 
            type="date" 
            name="bod" 
            id="" 
            defaultValue={bod}
            className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">About Yourself</p>
            <textarea type="text" 
            defaultValue={bio}
            name="bio" id="" placeholder="Write something about you ----------"
             className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Present Address</p>
            <textarea type="text"
            defaultValue={presentAddress}
            name="pre_address" id="" placeholder="Present Address" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Permanent Address</p>
            <textarea type="text" 
            defaultValue={permanentAddress}
            name="per_address" id="" placeholder="Permanent Address" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <br />
        </div>
        <button className=" bg-blue-800 hover:bg-yellow-800 w-full p-3 text-white font-bold border rounded-lg" type="submit">Update Profile</button>
      </form>

    </div>
  );
};

export default EditProfile;