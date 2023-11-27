import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../../Firebase/AuthProvider';

const Offered = () => {
  const {user} = useContext(AuthContext);

  const wishedItem = useLoaderData();
  const { property_title, property_image, agent_name, agent_email, property_location, price_range } = wishedItem;

  const today = new Date();

  const [mini, maxi] = price_range.split('-');
  const lower = parseInt(mini, 10);
  const upper = parseInt(maxi, 10);

  console.log(lower, upper);


  const handleOfferedProperty = (e) => {
    e.preventDefault();
    const form = e.target;
    const propertyName = form.property_name.value;
    const propertyLocation = form.property_location.value;
    const agentName = form.agent_name.value;
    const agentEmail = form.agent_email.value;
    const buyerName = form.buyer_name.value;
    const buyerEmail = form.buyer_email.value;
    const offeredAmount = form.offered_amount.value;
    const orderedDate = form.ordered_date.value;

    
    const offeredData = {
      propertyName, propertyLocation, property_image, agentName, agentEmail, buyerName, buyerEmail, offeredAmount, orderedDate, status : "pending"
    }
    
    fetch('http://localhost:5000/offeredProperty', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offeredData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          swal("Okay, Done!", "Offered successfully!", "success");
        }
      });
  }


  return (
    <div className="my-5">
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Offered Page</h2>
     <form onSubmit={handleOfferedProperty} action="" method="post" className="w-full text-center border-x-4 border-b-4 rounded-xl border-blue-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex justify-center items-center w-full">
            <p className=" text-slate-600 font-bold w-[200px]">Property Name</p>

            <input type="text" name="property_name" id="" defaultValue={property_title} disabled required className="m-3 w-3/4 p-3 text-slate-600 font-semibold border border-slate-600 rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-slate-600 font-bold w-[200px]">Property Location</p>
            <input type="text" required name="property_location" id="" defaultValue={property_location} disabled className="m-3 w-3/4 p-3 text-slate-600 font-semibold border border-slate-600 rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-slate-600 font-bold w-[200px]">Agent Name</p>
            <input type="text" name="agent_name" id="" defaultValue={agent_name} disabled className="m-3 w-3/4 p-3 text-slate-600 font-semibold border border-slate-600 rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-slate-600 font-bold w-[200px]">Agent Email</p>
            <input type="text" name="agent_email" id="" defaultValue={agent_email} disabled className="m-3 w-3/4 p-3 text-slate-600 font-semibold border border-slate-600 rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-slate-600 font-bold w-[200px]">Buyer Name</p>
            <input type="text" name="buyer_name" id="" defaultValue={user?.displayName} disabled className="m-3 w-3/4 p-3 text-slate-600 font-semibold border border-slate-600 rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-slate-600 font-bold w-[200px]">Buyer Email</p>
            <input type="text" name="buyer_email" id="" defaultValue={user?.email} disabled className="m-3 w-3/4 p-3 text-slate-600 font-semibold border border-slate-600 rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-slate-600 font-bold w-[200px]">Offered Amount($)</p>
            <input type="number" min={lower} max={upper}  name="offered_amount" id="" required placeholder="Offered Amount" className="m-3 w-3/4 p-3 text-slate-600 font-semibold border border-slate-600 rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-slate-600 font-bold w-[200px]">Date</p>
            <input type="Date" step="0.01" name="ordered_date" id="" defaultValue={today} required placeholder="Date" className="m-3 w-3/4 p-3 text-slate-600 font-semibold border border-slate-600 rounded-lg" />
          </div>

          <br />
        </div>
        <button className="bg-blue-800 w-full p-3 hover:bg-slate-900 text-white font-bold border border-slate-600 rounded-b-lg" type="submit">Offer Now</button>
      </form>

    </div>
  );
};

export default Offered;