import { useState } from 'react';

const AddVideoForm = ({ onAdd }) => {
  const [newVideo, setNewVideo] = useState({ title: '', description: '', url: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newVideo);
    setNewVideo({ title: '', description: '', url: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-6">
      <h2 className="text-xl font-semibold">Add Video</h2>
      <input
        type="text"
        placeholder="Title"
        value={newVideo.title}
        onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
        required
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={newVideo.description}
        onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="url"
        placeholder="Video URL"
        value={newVideo.url}
        onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
        required
        className="w-full px-3 py-2 border rounded"
      />
      <button type="submit" className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
        Add Video
      </button>
    </form>
  );
};

export default AddVideoForm;
