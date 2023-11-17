// src/components/AddToFavoriteButton.js

import React from 'react';

const AddToFavoriteButton = ({ songId }) => {
    const addToFavorite = async () => {
        const response = await fetch('/favorite-song/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({ 3: songId }),
        });

        const data = await response.json();
        alert(data.message);
    };

    return (
        <button onClick={addToFavorite}>Thêm vào danh sách yêu thích</button>
    );
};

export default AddToFavoriteButton;
