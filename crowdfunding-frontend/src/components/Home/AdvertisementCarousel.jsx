import React from "react";
import { Carousel } from "react-bootstrap";

const AdvertisementCarousel = () => {
  return (
    <Carousel className="my-4">
      <Carousel.Item>
        <img className="d-block w-100" src="images/ad1.jpg" alt="Advertisement 1" />
        <Carousel.Caption>
          <h3>Support Education</h3>
          <p>Help build schools for underprivileged children.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="images/ad2.webp" alt="Advertisement 2" />
        <Carousel.Caption>
          <h3>Advance Medical Research</h3>
          <p>Contribute to groundbreaking research for better health.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="images/ad3.jpeg" alt="Advertisement 3" />
        <Carousel.Caption>
          <h3>Save the Environment</h3>
          <p>Support projects that focus on climate change and conservation.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default AdvertisementCarousel;
