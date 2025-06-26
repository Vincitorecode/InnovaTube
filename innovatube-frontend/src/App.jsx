import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import VideoList from './components/VideoList';
import AddVideoForm from './components/AddVideoForm';

import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [videos, setVideos] = useState([]);

  const handleLogin = async (loginData) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        alert('Login successful!');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/videos');
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAddVideo = async (video) => {
    if (!token) {
      alert('You must be logged in to add videos');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(video),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Video added!');
        fetchVideos();
      } else {
        alert(data.message || 'Error adding video');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">InnovaTube</h1>

        {!token ? (
          <>
            <LoginForm onLogin={handleLogin} />
            <div className="mt-8">
              <RegisterForm />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Videos</h2>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </div>

            <VideoList videos={videos} />
            <AddVideoForm onAdd={handleAddVideo} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
