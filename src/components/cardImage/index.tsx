import Styles from './cardImage.module.scss';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainCard from '../MainCard';
import { AiOutlineDollar, AiOutlineClockCircle } from 'react-icons/ai';
import Badge from '../badge';
import TitleHeader from '../titleHeader';
import RatingStars from '../ratingStars';
import Paragraph from '../paragraph';

export type CardImageProps = {
  className?: string;
  img: string;
  badgeText?: string;
  stars?: number;
  userImg?: string;
  userName?: string;
  title?: string;
  intro?: string;
  date?: string;
  cost?: string;
  onClick?: (e: any) => void;
};

const CardImage = React.forwardRef(
  (
    {
      className,
      stars,
      img,
      badgeText,
      userImg,
      userName,
      title,
      intro,
      date,
      cost,
      onClick,
    }: CardImageProps,
    ref: React.Ref<HTMLHeadingElement>
  ) => {
    return (
      <MainCard
        className={className}
        img={img}
        overlay={
          <Container fluid className='mx-0 px-0 full-hieght'>
            <Row>
              <Col className='d-flex justify-content-end'>
                {badgeText && <Badge text={badgeText} />}
              </Col>
            </Row>
            <Row className='hieght-85 align-items-end'>
              <Col xs={6} className='px-0 mx-0'>
                {userImg && (
                  <img
                    alt={'user image'}
                    src={userImg}
                    className={'avatar-image'}
                    width='100'
                    height='100'
                  />
                )}
                <span className={'ms-2 text-xsm-black'}>
                  {userName && userName}
                </span>
              </Col>
              <Col xs={6} className='px-0 mx-0 mb-2 d-flex justify-content-end'>
                {stars && <RatingStars rating={stars} />}
              </Col>
            </Row>
          </Container>
        }
        head={title && <TitleHeader type='smaller' text={title} />}
        bordered
        onClick={onClick ? (e) => onClick(e) : undefined}
      >
        <Container>
          {intro && (
            <Row>
              <Col>
                <Paragraph
                  type='gullGrey'
                  className={'fs-md'}
                  dangerouslySetInnerHTML={{ __html: intro }}
                />
              </Col>
            </Row>
          )}
          <Row className={'mt-3 font-dark-black'}>
            <Col xs={6} className='px-0'>
              {cost && (
                <Row className='px-0 mx-0'>
                  <Col xs={2} className='px-0 mx-0'>
                    <AiOutlineDollar />
                  </Col>
                  <Col
                    xs={10}
                    className='px-0 mx-0 pt-1 d-flex justify-content-start'
                  >
                    <Paragraph className='fs-x-sm mt-0'>{cost}</Paragraph>
                  </Col>
                </Row>
              )}
            </Col>
            <Col xs={6} className='px-0'>
              {date && (
                <Row className='px-0 mx-0'>
                  <Col xs={2} className='px-0 mx-0'>
                    <AiOutlineClockCircle />
                  </Col>
                  <Col xs={10} className='px-0 mx-0 pt-1 justify-content-end'>
                    <Paragraph className='fs-x-sm mt-0'>{date}</Paragraph>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </MainCard>
    );
  }
);

CardImage.displayName = 'CardImage';
export default CardImage;
