import './HomePage.css'
import { Link } from 'react-router-dom';


export default function HomePage() {
  return (
  <div className="welcome-page">
    <div className="overlay">
      <h1>Welcome to the Silken Web</h1>
      <p>
        The first and only CRM made for adult entertainers to track patrons across platforms and venues.
        Whether you met them in a club, or slid into their DMs, keep every strand of your hustle organized.
      </p>
      <p>
        Spin your empire - one connection at a time.
      </p>
      <div className="welcome-buttons">
        <Link to="/signup" className="btn">Create Account</Link>
        <Link to="/login" className="btn">Log In</Link>
      </div>
    </div>
  </div>
  );
}