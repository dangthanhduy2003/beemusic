
import React, { useState, useEffect } from 'react';

const FavoriteList = () => {
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    // Gọi API hoặc sử dụng axios để lấy danh sách bài hát yêu thích từ Laravel backend
    // Ví dụ: axios.get('/api/favorites').then(response => setUserFavorites(response.data));
  }, []);

  return (
    <div>
      <h1>Your Favorite Songs</h1>
      <ul>
        {userFavorites.map(favorite => (
          <li key={favorite.id}>
            {/* Hiển thị thông tin về bài hát yêu thích */}
            {favorite.song.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
