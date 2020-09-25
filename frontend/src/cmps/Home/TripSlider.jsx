import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Autoplay, EffectFade, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/swiper-bundle.css';
import 'swiper/components/effect-fade/effect-fade.scss';
import { TripList } from './TripList';
import { TripPreview } from './TripPreview';
import { utils } from '../../services/utils';



SwiperCore.use([EffectCoverflow, Autoplay, EffectFade, Navigation, Pagination, Scrollbar, A11y]);



const coverflow = {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 2,
    // slideShadows: true,
}

export function TripSlider({ trips }) {


    return (
        <Swiper
            effect="coverflow"
            slidesPerView={"auto"}
            // effectCoverflow={true}
            navigation
            rotate={-20}
            stretch={0}
            depth={200}
            modifier={5}
            centeredSlides={ true}
            // autoplay={true}
            delay={2500}

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