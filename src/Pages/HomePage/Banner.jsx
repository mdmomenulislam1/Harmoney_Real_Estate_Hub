import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"

const Banner = () => {
  return (
    <Carousel className='text-center'>
      <div>
        <img src="https://i.ibb.co/nL1Syrs/green-real-estate-facebook-post-design-template-24176354c260f45e3cc3b41f3498936d-screen.jpg" />
        
      </div>
      <div>
        <img src="https://i.ibb.co/wgP616J/OIP.jpg" />
        
      </div>
      <div>
        <img src="https://i.ibb.co/6F3chDM/23.jpg" />
        
      </div>
      <div>
        <img src="https://i.ibb.co/6F3chDM/23.jpg" />
        
      </div>
      <div>
        <img src="https://i.ibb.co/GdsNsZR/OIP.jpg" />
        
      </div>
      
    </Carousel>
  );
};

export default Banner;