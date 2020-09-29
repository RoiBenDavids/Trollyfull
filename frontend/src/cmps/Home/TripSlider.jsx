import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Autoplay, EffectFade, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/swiper-bundle.css';
import 'swiper/components/effect-fade/effect-fade.scss';
import { TripPreview } from './TripPreview';
import { utils } from '../../services/utils';



SwiperCore.use([EffectCoverflow, Autoplay, EffectFade, Navigation, Pagination, Scrollbar, A11y]);




export function TripSlider({ trips }) {



    return (
        <Swiper
            effect="coverflow"
            slidesPerView={"auto"}
            // effectCoverflow={true}
            navigation
            centeredSlides={ true}
            // autoplay={true}
            delay={2500}
            coverflowEffect= {{
                rotate: 30,
                depth: 200
              }}

        pagination={{ clickable: true }}
        >


            {
                trips.map((i, el) => {
                    return <SwiperSlide key={utils.makeId()}>
                        <TripPreview trip={i}  key={i._id} addClass={'slider'} img={utils.getRandomPic()}/> 
                    </SwiperSlide>;
                })
            }
        </Swiper >
    );
};