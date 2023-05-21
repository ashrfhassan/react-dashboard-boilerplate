import React from 'react';
import Styles from './slider.module.scss';
import SlickSlider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function NextArrow({ onClick }: { onClick: (e: any) => void }) {
  return (
    <div
      className={` ${Styles['arrow']} ${Styles['arrow-right']}`}
      onClick={onClick}
    >
      <IoIosArrowForward />
    </div>
  );
}

function PrevArrow({ onClick }: { onClick: (e: any) => void }) {
  return (
    <div
      className={`${Styles['arrow']} ${Styles['arrow-left']}`}
      onClick={onClick}
    >
      <IoIosArrowBack />
    </div>
  );
}

export type sliderProps = {
  className?: string;
  slides: React.ReactNode[];
  locale?: 'en' | 'ar';
};

const Slider = React.forwardRef(({ slides, locale }: sliderProps, ref: any) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={() => undefined} />,
    prevArrow: <PrevArrow onClick={() => undefined} />,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className={`mx-2 ${Styles['slider-wrapper']}`}>
      <SlickSlider {...settings}>
        {slides.map((slide, i) => (
          <div key={i} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {slide}
          </div>
        ))}
      </SlickSlider>
    </div>
  );
});

Slider.displayName = 'Slider';
export default Slider;
