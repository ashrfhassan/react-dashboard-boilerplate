import Styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

export type RatingStarsProps = {
  emptyStarClassName?: string;
  halfStarClassName?: string;
  fullStarClassName?: string;
  className?: string;
  black?: boolean;
  rating: number;
  fillOnHover?: boolean;
  size?: number;
  onClick?: (starsRating: number) => void;
};

const RatingStars = React.forwardRef(
  (
    {
      emptyStarClassName,
      halfStarClassName,
      fullStarClassName,
      className,
      black,
      rating,
      fillOnHover,
      size,
      onClick,
    }: RatingStarsProps,
    ref: React.Ref<HTMLHeadingElement>
  ) => {
    const [starsRating, setStarsRating] = useState(rating);
    const [genStars, setGenStars] = useState<React.ReactNode[]>([]);
    useEffect(() => {
      setGenStars(generateStars(starsRating));
    }, [starsRating]);
    useEffect(() => {
      setGenStars(generateStars(rating));
    }, [rating]);
    const generateStars = (starsRating: number) => {
      const stars: React.ReactNode[] = [];
      for (let i = 0; i < 5; i++) {
        if (starsRating > i) {
          starsRating - i > 0 && starsRating - i < 1
            ? stars.push(
                <BsStarHalf
                  className={`${halfStarClassName} ${Styles['half-star']}`}
                  color='#FF9F00'
                  size={size}
                />
              )
            : stars.push(
                <BsStarFill
                  className={fullStarClassName}
                  color='#FF9F00'
                  onMouseLeave={() => {
                    fillOnHover && setStarsRating(0);
                  }}
                  onMouseDown={() => {
                    fillOnHover && setStarsRating(i);
                    fillOnHover && onClick && onClick(i + 1);
                  }}
                  size={size}
                />
              );
          continue;
        }
        stars.push(
          <BsStar
            className={emptyStarClassName}
            color={black ? '#000000' : '#ffffff'}
            onMouseOver={() => fillOnHover && setStarsRating(i + 1)}
            onMouseDown={() => {
              fillOnHover && setStarsRating(i + 1);
              fillOnHover && onClick && onClick(i + 1);
            }}
            size={size}
          />
        );
      }
      return stars;
    };
    return (
      <div onClick={() => onClick && onClick(starsRating)} className={'d-flex'}>
        {genStars.reverse().map((star, i) => (
          <div key={i} className={`d-flex ${className}`}>
            {star}
          </div>
        ))}
      </div>
    );
  }
);

RatingStars.displayName = 'RatingStars';
export default RatingStars;
