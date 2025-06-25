import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [videos, setVideos] = useState([]);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [newVideo, setNewVideo] = useState({ title: '', description: '', url: '' });

  // login function
  const handleLogin = async (e) => {
    e.preventDefault();
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

  // Obtener videos del backend
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

  // Subir video nuevo (requiere token)
  const handleAddVideo = async (e) => {
    e.preventDefault();
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
        body: JSON.stringify(newVideo),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Video added!');
        setNewVideo({ title: '', description: '', url: '' });
        fetchVideos();
      } else {
        alert(data.message || 'Error adding video');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>InnovaTube</h1>

      {!token ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
            required
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            required
          /><br />
          <button type="submit">Login</button>
        </form>
      ) : (
        <>
          <button onClick={() => {
            setToken('');
            localStorage.removeItem('token');
          }}>Logout</button>

          <h2>Videos</h2>
          {videos.length === 0 ? (
            <p>No videos yet</p>
          ) : (
            <ul>
              {videos.map(video => (
                <li key={video._id}>
                  <strong>{video.title}</strong> by {video.author.username}<br />
                  <a href={video.url} target="_blank" rel="noopener noreferrer">{video.url}</a><br />
                  <em>{video.description}</em>
                </li>
              ))}
            </ul>
          )}

          <h2>Add Video</h2>
          <form onSubmit={handleAddVideo}>
            <input
              type="text"
              placeholder="Title"
              value={newVideo.title}
              onChange={e => setNewVideo({ ...newVideo, title: e.target.value })}
              required
            /><br />
            <input
              type="text"
              placeholder="Description"
              value={newVideo.description}
              onChange={e => setNewVideo({ ...newVideo, description: e.target.value })}
            /><br />
            <input
              type="url"
              placeholder="Video URL"
              value={newVideo.url}
              onChange={e => setNewVideo({ ...newVideo, url: e.target.value })}
              required
            /><br />
            <button type="submit">Add Video</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;