import Styles from './MainCard.module.scss';
import React from 'react';
import Card from 'react-bootstrap/Card';

export type MainCardProps = {
  className?: string;
  img?: string;
  overlay?: React.ReactNode;
  head?: React.ReactNode;
  headClassName?: string;
  children: React.ReactNode;
  bodyClassName?: string;
  bodyBgImageUrl?: string;
  rounded?: boolean;
  bordered?: boolean;
  hasHoverEffect?: boolean;
  onClick?: (e: any) => void;
};

const MainCard = React.forwardRef(
  (
    {
      className,
      img,
      overlay,
      head,
      headClassName,
      children,
      bodyClassName,
      bodyBgImageUrl,
      rounded,
      bordered,
      hasHoverEffect,
      onClick,
    }: MainCardProps,
    ref: React.Ref<any>
  ) => (
    <>
      <Card
        className={`border ${rounded ? 'rounded-4' : ''} ${
          hasHoverEffect ? Styles['card-effects'] : ''
        } ${bordered ? 'border-1' : 'border-0'} ${onClick ? 'pointer' : ''} ${
          className ?? ''
        }`}
        onClick={(e) => (onClick ? onClick(e) : undefined)}
      >
        <div className='position-relative d-flex'>
          {img && <Card.Img variant='top' src={img} />}
          {overlay && <Card.ImgOverlay>{overlay}</Card.ImgOverlay>}
        </div>
        {head && (
          <Card.Body className={`${headClassName ?? ''}`}>{head}</Card.Body>
        )}
        <Card.Body
          className={`${bodyClassName ?? ''}`}
          style={
            bodyBgImageUrl
              ? {
                  backgroundImage: `url(${bodyBgImageUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }
              : {}
          }
        >
          {children}
        </Card.Body>
      </Card>
    </>
  )
);

MainCard.displayName = 'MainCard';
export default MainCard;
