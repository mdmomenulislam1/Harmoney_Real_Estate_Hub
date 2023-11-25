import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Promo = () => {
  return (
    <section>
      <Swiper
        spaceBetween={1}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className='max-w-screen-xl my-10'

        centeredSlides={true}

        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}

      >
        <SwiperSlide>
          <img className="w-84 h-full" src="https://i.ibb.co/wp11rQh/OIP.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-84 h-full" src="https://i.ibb.co/mtCZZk3/OIP.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-84 h-full" src="https://i.ibb.co/cTkM12h/OIP.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-84 h-full" src="https://i.ibb.co/mtCZZk3/OIP.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-84 h-full" src="https://i.ibb.co/wp11rQh/OIP.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-84 h-full" src="https://i.ibb.co/mtCZZk3/OIP.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-84 h-full" src="https://i.ibb.co/cTkM12h/OIP.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-84 h-full" src="https://i.ibb.co/mtCZZk3/OIP.jpg" alt="" />
        </SwiperSlide>

      </Swiper>
    </section>
  );
};

export default Promo;