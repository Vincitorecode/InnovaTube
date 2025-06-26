const VideoList = ({ videos }) => {
  if (!videos.length) return <p>No videos yet</p>;

  return (
    <ul className="space-y-4">
      {videos.map((video) => (
        <li key={video._id} className="border-b pb-2">
          <strong>{video.title}</strong> by {video.author?.username || 'Unknown'} <br />
          <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {video.url}
          </a>
          <p className="italic">{video.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default VideoList;
