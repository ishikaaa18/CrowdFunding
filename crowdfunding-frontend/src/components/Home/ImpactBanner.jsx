import React from 'react';
import '../../styles/ImpactBanner.css';

const ImpactBanner = () => {
  return (
    <section className="impact-banner">
      <div className="banner-content">
        <h1>Change Lives with Your Contributions</h1>
        <p>Join hands with us in making a difference today.</p>
        <a href="/campaigns" className="cta-button">Explore Campaigns</a>
      </div>
    </section>
  );
};

export default ImpactBanner;
