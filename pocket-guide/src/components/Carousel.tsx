import { ReactNode, useState } from 'react';

export type Slide = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
};

export default function Carousel({ slides }: { slides: Slide[] }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="carousel">
      <button aria-label="Previous" className="carousel-nav left" onClick={prev}>
        ‹
      </button>
      <div className="carousel-viewport">
        {slides.map((s, i) => (
          <div key={s.id} className={`carousel-slide ${i === idx ? 'active' : ''}`} onClick={s.onClick}>
            <img src={s.imageUrl} alt={s.title} />
            <div className="carousel-caption">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button aria-label="Next" className="carousel-nav right" onClick={next}>
        ›
      </button>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button key={i} className={`dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  );
}