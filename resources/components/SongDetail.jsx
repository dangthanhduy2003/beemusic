// src/components/SongDetail.js

import React from 'react';
import AddToFavoriteButton from './AddToFavoriteButton';

const SongDetail = ({ song }) => {
    return (
        <div>
            <h2>{song.name}</h2>
            <p>Artist: {song.artist}</p>
            <p>Lyrics: {song.lyrics}</p>
            <AddToFavoriteButton songId={song.id} />
        </div>
    );
};

export default SongDetail;
