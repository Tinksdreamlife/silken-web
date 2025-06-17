import { NavLink, Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../services/authService';
import { getUser } from '../../services/authService'
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
    // The <Link> that was clicked will navigate to "/"
  }

  return (
    <nav className="NavBar">
      <NavLink to="/">{user ? 'Dashboard' : 'HomePage'}</NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/patrons" end>My Patrons</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/patrons/new">Add Patron</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/profile">Profile</NavLink>
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>Log Out</Link>
           &nbsp; | &nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}