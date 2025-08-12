import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/userStore';
import { useState } from 'react';

export default function Exit() {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const addReview = useAppStore((s) => s.addReview);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const onExit = () => {
    if (confirm('Do you want to exit? Please leave a quick review.')) {
      if (comment) {
        addReview({ username: user?.username || 'Guest', rating, comment });
        alert('Thanks for your review!');
      }
      window.location.href = 'about:blank';
    }
  };

  return (
    <div className="exit">
      <h2>Do you want to exit?</h2>
      <p>Before exiting this app, please share a quick review.</p>

      <div className="review">
        <label>
          <span>Rating</span>
          <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(parseInt(e.target.value || '5'))} />
        </label>
        <label>
          <span>Comment</span>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Your feedback helps other users" />
        </label>
      </div>

      <div className="actions">
        <button className="secondary" onClick={() => navigate('/home')}>Stay</button>
        <button className="danger" onClick={onExit}>Exit</button>
      </div>
    </div>
  );
}