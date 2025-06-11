import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
import PostListPage from '../PostListPage/PostListPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import ProfilePage from '../ProfilePage/ProfilePage';
import PatronListPage from '../PatronListPage/PatronListPage';
import AddPatronPage from '../AddPatronPage/AddPatronPage';
import './App.css';
import EditPatronPage from '../EditPatronPage/EditPatronPage';
import AddStrandPage from '../AddStrandPage/AddStrandPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/patrons" element={<PatronListPage />} />
            <Route path="patrons/new" element={<AddPatronPage />} />
            <Route path="/patrons/:id/edit" element={<EditPatronPage />} />
            <Route path="/patrons/:id/strands/new" element={<AddStrandPage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/new" element={<NewPostPage />} />
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    </main>
  );
}

