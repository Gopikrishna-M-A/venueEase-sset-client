import React from "react";
import { Typography, Button, Carousel, Tag } from "antd";

const { Text, Title } = Typography;

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#d9d9d9",
  borderRadius: "4px",
};

const Card = ({ venue }) => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="card-wrapper">
      <div className="card-img-slider">
        <Carousel afterChange={onChange}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
      <div className="card-desc">
        <Title className="card-title" level={4}>
          {venue.venueName}
        </Title>
        <Text className="card-location" >
          {venue.location}
        </Text>
        <br />
        <Text className="card-venue-desc" type="secondary">
          {venue.venueDescription}
        </Text>
        <div className="cart-tag-wrapper">
          {venue.amenities.map((amenity) => (
            <Tag bordered={false}>{amenity}</Tag>
          ))}
        </div>
      </div>

      <Button type="primary">Reserve Now</Button>
    </div>
  );
};

export default Card;
