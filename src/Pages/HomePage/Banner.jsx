import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"

const Banner = () => {
  return (
    <div className="">
      <Carousel className="text-center ">
      <div className="h-[400px]">
        <img className="rounded-b-xl" src="https://i.ibb.co/v4gDJj2/house-1836070-1280.jpg" />
        
      </div>
      <div>
        <img className="rounded-b-xl" src="https://i.ibb.co/rMfryJq/large-home-389271-640.jpg" />
        
      </div>
      <div>
        <img className="rounded-b-xl" src="https://i.ibb.co/DCGLFhL/kitchen-1543493-640.webp" />
        
      </div>
      <div>
        <img className="rounded-b-xl" src="https://i.ibb.co/HHg4r4N/residence-2219972-640.jpg" />
        
      </div>
      <div>
        <img className="rounded-b-xl" src="https://i.ibb.co/qRXCQy3/home-5835289-640.jpg" />
        
      </div>
      
    </Carousel>
    </div>
  );
};

export default Banner;