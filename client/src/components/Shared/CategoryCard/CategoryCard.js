import React from 'react';
import './category-card.style.scss';
export default function CategoryCard({ text, background, uppercase = false }) {
  return (
    <div className="category-card-wrap">
      <div
        className="category-card"
        style={{
          backgroundImage: `linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 95.83%), url(${background})`,
        }}
      >
        <div className="category-card-text">{text}</div>
      </div>
    </div>
  );
}
