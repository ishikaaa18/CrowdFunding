import React from "react";
import { Carousel } from "react-bootstrap";
import ad1 from "../../assets/images/ad1.jpg";
import ad2 from "../../assets/images/ad2.webp";
import ad3 from "../../assets/images/ad3.jpeg";


const AdvertisementCarousel = () => {
  return (
    <Carousel className="my-4">
      <Carousel.Item>
        <img className="d-block w-100" src={ad1} alt="Advertisement 1" />
        <Carousel.Caption>
          <h3>Support Education</h3>
          <p>Help build schools for underprivileged children.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={ad2} alt="Advertisement 2" />
        <Carousel.Caption>
          <h3>Advance Medical Research</h3>
          <p>Contribute to groundbreaking research for better health.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={ad3} alt="Advertisement 3" />
        <Carousel.Caption>
          <h3>Save the Environment</h3>
          <p>Support projects that focus on climate change and conservation.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default AdvertisementCarousel;

