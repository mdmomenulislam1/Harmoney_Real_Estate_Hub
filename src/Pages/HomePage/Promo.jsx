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
        className='max-w-screen-2xl my-10'

        centeredSlides={true}

        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}

      >
        <SwiperSlide className="pb-16">
          <img className="w-84 h-[400px]" src="https://i.ibb.co/HYhVQn2/interior-design-3564955-640.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="pb-16">
          <img className="w-84 h-[400px]" src="https://i.ibb.co/cLh9CsK/floor-2228277-640.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="pb-16">
          <img className="w-84 h-[400px]" src="https://i.ibb.co/FgPD9X5/interior-3778708-640.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="pb-16">
          <img className="w-84 h-[400px]" src="https://i.ibb.co/F3YFmSR/bedroom-1940169-640.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="pb-16">
          <img className="w-84 h-[400px]" src="https://i.ibb.co/z7rgKNC/kitchen-1940175-640.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="pb-16">
          <img className="w-84 h-[400px]" src="https://i.ibb.co/ZMz03y4/living-room-3539587-640.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="pb-16">
          <img className="w-84 h-[400px]" src="https://i.ibb.co/gd1tGVh/bedroom-3778695-640.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="pb-16">
          <img className="w-84 h-[400px]" src="https://i.ibb.co/d5sG4gM/staging-2816464-640.jpg" alt="" />
        </SwiperSlide>

      </Swiper>
    </section>
  );
};

export default Promo;