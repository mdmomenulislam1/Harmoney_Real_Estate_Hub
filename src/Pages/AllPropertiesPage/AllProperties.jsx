import { useState } from 'react';
import useProperty from '../../Hooks/useProperties';
import PropertyItem from './PropertyItem';

const AllProperties = () => {
  const [asc, setAsc] = useState(true);
  const [search, setSearch] = useState('');
  const [property] = useProperty(asc, search);
  const propertyData = property?.filter((item) => item?.verification_status === "Verified");

  const handleSearch = e => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  }

  return (
    <div className="mx-10 my-10">
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">All Properties Page</h2>
      <div className="my-5 flex justify-center">
        <form onSubmit={handleSearch} action="" >
          <input type="text" name="search" placeholder="Property Name" className="w-1/3 border-2 border-pink-700 p-4 rounded-l-lg" />
          <input type="submit" value="Search" className="w-[100px] border-y-2 border-r-2 bg-pink-800 border-pink-700 p-4 rounded-r-lg font-bold text-white" />
        </form>

        <button 
        onClick={() => setAsc(!asc)} 
        className="w-[150px]  border-y-2 border-r-2 bg-pink-800 border-pink-700 rounded-lg font-bold text-white"> {asc ? 'Price: High to Low' : 'Price: Low To High'} </button>
      </div>
      {
        propertyData?.length !== 0 ?
          <div className="grid md:grid-cols-2 gap-10 max-w-screen-xl mx-auto my-5">
            {
              propertyData?.map(item => <PropertyItem
                key={item._id}
                item={item}
              ></PropertyItem>)
            }
          </div> :
          <div>
            <img className="rounded-xl h-full w-full" src="https://i.ibb.co/G2kW8nQ/image.png" alt="" />
          </div>
      }


    </div>
  );
};

export default AllProperties;