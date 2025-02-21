import React from "react";
import "../../styles/Testimonials.css";

// Import images correctly
import testimonial1 from "../../assets/images/testimonial1.jpg";
import testimonial2 from "../../assets/images/testimonial2.jpg";
import testimonial3 from "../../assets/images/testimonial3.jpg";

const testimonialsData = [
  {
    name: "Amit Roy",
    quote: "This platform helped me raise funds for my startup. Truly life-changing!",
    image: testimonial1,  // Use imported image
  },
  {
    name: "Sneha Verma",
    quote: "Seamless experience and amazing support. Highly recommend!",
    image: testimonial2,
  },
  {
    name: "Rahul Das",
    quote: "A fantastic way to bring communities together for a cause.",
    image: testimonial3,
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonials-container">
        {testimonialsData.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-img" />
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <h4 className="testimonial-name">{testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

