import React from "react";
import { Carousel } from "react-bootstrap";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import "../styles/Home.css";

const Home = () => {
  const projects = [
    { id: 1, title: "Project A", description: "Help build a new school", image: "images/Project1.jpg" },
    { id: 2, title: "Project B", description: "Support medical research", image: "images/Project2.jpg" },
    { id: 3, title: "Project C", description: "Provide clean water to underserved communities", image: "images/Project3.webp" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Advertisement Carousel */}
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

      {/* Featured Projects */}
      <section className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="row">
          {projects.map((project) => (
            <div key={project.id} className="col-md-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose CrowdFunding?</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="icon"><i className="fas fa-hand-holding-heart"></i></div>
              <h3>Make a Real Impact</h3>
              <p>Fund essential causes and see the change you create.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="icon"><i className="fas fa-users"></i></div>
              <h3>Join a Community</h3>
              <p>Be a part of a global network of passionate individuals.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="icon"><i className="fas fa-shield-alt"></i></div>
              <h3>Secure & Transparent</h3>
              <p>Rest easy with our secure payment methods and transparent tracking.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="icon"><i className="fas fa-trophy"></i></div>
              <h3>Get Recognition</h3>
              <p>Earn badges and stay updated on your project’s progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How Does CrowdFunding Work?</h2>
        <ol>
          <li><strong>Create a Project:</strong> Sign up and create a project for a meaningful cause.</li>
          <li><strong>Set Your Goal:</strong> Define your funding target and explain how the funds will be used.</li>
          <li><strong>Share Your Project:</strong> Promote your project on social media and among your network.</li>
          <li><strong>Get Funded:</strong> Watch your funding grow as contributions come in.</li>
          <li><strong>Update Supporters:</strong> Keep contributors informed with updates on your project's progress.</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
