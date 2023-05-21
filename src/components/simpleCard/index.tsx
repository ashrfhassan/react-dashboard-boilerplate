import Styles from './simpleCard.module.scss';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TitleHeader from '../titleHeader';
import MainCard from '../MainCard';
import Paragraph from '../paragraph';
import RatingStars from '../ratingStars';

export type SimpleCardProps = {
  className?: string;
  bordered?: boolean;
  img: string;
  title: string;
  rating: number;
  hoverTitle?: string;
  subTitle: string;
  hoverSubTitleTitle?: string;
  onClick?: (e: any) => void;
};

const SimpleCard = React.forwardRef(
  (
    {
      className,
      bordered,
      img,
      title,
      rating,
      hoverTitle,
      subTitle,
      hoverSubTitleTitle,
      onClick,
    }: SimpleCardProps,
    ref: React.Ref<HTMLHeadingElement>
  ) => {
    return (
      <MainCard
        bordered={bordered}
        className='pointer'
        onClick={onClick ? (e) => onClick(e) : undefined}
      >
        <Container className={`${Styles['simpleCard']}`}>
          <Row>
            <Col className='d-flex justify-content-center'>
              <img
                alt={'image'}
                src={img}
                className={`${Styles['simple-image']}`}
                width='100'
                height='100'
              />
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center'>
              <TitleHeader
                type='smaller'
                text={title}
                hoverTitle={hoverTitle}
              />
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center mt-1'>
              <RatingStars rating={rating ?? 0} black className={'mt-04rem'} />
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center mt-2'>
              <Paragraph hoverTitle={hoverSubTitleTitle}>{subTitle}</Paragraph>
            </Col>
          </Row>
        </Container>
      </MainCard>
    );
  }
);

SimpleCard.displayName = 'SimpleCard';
export default SimpleCard;
