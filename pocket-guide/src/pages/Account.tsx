import { useAppStore } from '../store/userStore';

export default function Account() {
  const { user, reviews } = useAppStore();
  return (
    <div className="account">
      <h2>Account</h2>
      {user ? (
        <div className="info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Name:</strong> {user.fullName}</p>
          {user.email && <p><strong>Email:</strong> {user.email}</p>}
          {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
          {user.nationalId && <p><strong>National ID:</strong> {user.nationalId}</p>}
          {user.passport && <p><strong>Passport:</strong> {user.passport}</p>}
        </div>
      ) : (
        <p>No user info. Please login.</p>
      )}

      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="reviews">
          {reviews.map((r) => (
            <li key={r.id}>
              <div><strong>{r.username}</strong> rated {r.rating}/5</div>
              <div>{r.comment}</div>
              <div className="ts">{new Date(r.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}