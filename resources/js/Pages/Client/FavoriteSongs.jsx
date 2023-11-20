import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '@/Layouts/DefaultLayout';
import styled from 'styled-components';
import { Link } from '@inertiajs/inertia-react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StyledBox = styled.div`
  background-color: ${(props) => props.bgColor || getRandomColor()};
`;

const FavoriteSongs = ({ auth, favoriteSongs }) => {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6ae36b2 (update favorite)
=======
>>>>>>> c74a5d7 (up)
  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this favorite song?');
    if (shouldDelete) {
      try {
        await axios.delete(`/favorite-songs/${id}`);
      } catch (error) {
        console.error('Error deleting favorite song:', error);
      }
    }
  };
<<<<<<< HEAD
=======
  // Other states...

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

<<<<<<< HEAD
=======
>>>>>>> fc18299 (updateee)
  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this favorite song?');
    if (shouldDelete) {
      try {
        await axios.delete(`/favorite-songs/${id}`);
      } catch (error) {
        console.error('Error deleting favorite song:', error);
      }
    }
<<<<<<< HEAD
};
>>>>>>> 982dafd (update favorite)
=======
  };
>>>>>>> fc18299 (updateee)
=======
  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this favorite song?');
    if (shouldDelete) {
        try {
            await axios.delete(`/favorite-songs/${id}`);
        } catch (error) {
            console.error('Error deleting favorite song:', error);
        }
    }
};
>>>>>>> 4976f32 (update favorite)
>>>>>>> 6ae36b2 (update favorite)
=======
>>>>>>> c74a5d7 (up)

  return (
    <>
      <DefaultLayout auth={auth}>
        <div className="grid grid-cols-3 w-full md:grid-cols-6 lg:grid-cols-6 gap-4 lg:gap-6 mt-3">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          {Array.isArray(favoriteSongs) && favoriteSongs.length > 0 ? (
=======
          {Array.isArray(favoriteSongs) &&
>>>>>>> 982dafd (update favorite)
=======
          {Array.isArray(favoriteSongs) && favoriteSongs.length > 0 ? (
>>>>>>> fc18299 (updateee)
=======
          {Array.isArray(favoriteSongs) && favoriteSongs.length > 0 ? (
=======
          {Array.isArray(favoriteSongs) &&
>>>>>>> 4976f32 (update favorite)
>>>>>>> 6ae36b2 (update favorite)
=======
          {Array.isArray(favoriteSongs) && favoriteSongs.length > 0 ? (
>>>>>>> c74a5d7 (up)
            favoriteSongs.map((favoriteSong) => (
              <StyledBox
                key={favoriteSong.id}
                className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:rounded-lg lg:w-44 lg:h-56"
              >
                <img
                  src={`http://localhost:8000/upload/images/${favoriteSong.song.thumbnail}`}
                  alt={favoriteSong.song.name}
                  className="w-full rounded-lg"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6ae36b2 (update favorite)
=======
>>>>>>> c74a5d7 (up)
                  style={{ height: '100px' }}
                />
                <div className="text-white text-center mt-2">
                  <span className="block font-semibold text-sm">{favoriteSong.song.name}</span>
                  <span className="block text-sm" style={{ color: '#ccc' }}>{favoriteSong.song.artist}</span>
<<<<<<< HEAD
=======
                  style={{height: '100px'}}
                />
                <div className="text-white text-center mt-2">
                  <span className="block font-semibold text-sm">{favoriteSong.song.name}</span>
                  <span className="block text-sm" style={{color: '#ccc'}}>{favoriteSong.song.artist}</span>
<<<<<<< HEAD
>>>>>>> 982dafd (update favorite)
=======
                  style={{ height: '100px' }}
                />
                <div className="text-white text-center mt-2">
                  <span className="block font-semibold text-sm">{favoriteSong.song.name}</span>
                  <span className="block text-sm" style={{ color: '#ccc' }}>{favoriteSong.song.artist}</span>
>>>>>>> fc18299 (updateee)
=======
>>>>>>> 4976f32 (update favorite)
>>>>>>> 6ae36b2 (update favorite)
=======
>>>>>>> c74a5d7 (up)
                  <Link
                    as="button"
                    onClick={() => handleDelete(favoriteSong.id)}
                    className="mt-2 text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </Link>
                </div>
              </StyledBox>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fc18299 (updateee)
=======
>>>>>>> 6ae36b2 (update favorite)
=======
>>>>>>> c74a5d7 (up)
            ))
          ) : (
            <span className="text-lg" style={{color: '#00B1DE', width:"300px"}}>Bạn chưa có bài hát yêu thích nào!</span>
          )}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
            ))}
>>>>>>> 982dafd (update favorite)
=======
>>>>>>> fc18299 (updateee)
=======
=======
            ))}
>>>>>>> 4976f32 (update favorite)
>>>>>>> 6ae36b2 (update favorite)
=======
>>>>>>> c74a5d7 (up)
        </div>
      </DefaultLayout>
    </>
  );
};

export default FavoriteSongs;
