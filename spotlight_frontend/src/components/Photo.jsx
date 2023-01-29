import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';

function Photo({ photo}) {

  const [postHovered, setPostHovered] = useState(true);
  const [savingPhoto, setSavingPhoto] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id } = photo;

  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deletePhoto = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  let alreadyLiked = photo?.like?.filter((item) => item?.postedBy?._id === user?.googleId);

  alreadyLiked = alreadyLiked?.length > 0 ? alreadyLiked : [];

  const likePhoto = (id) => {
    if (alreadyLiked?.length === 0) {
      setSavingPhoto(true);

      client
        .patch(id)
        .setIfMissing({ like: [] })
        .insert('after', 'like[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPhoto(false);
        });
    }
  };




  return (
    <div className='photo-container'>

      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/photo-detail/${_id}`)}
        className="photo-inner-container"
      >
          {image && (
        <img className="" src={(urlFor(image).width(250).url())} alt="user-post" /> )}
        {postHovered && (
          <div
            className="hover-buttons"
          >
            <div className="top-buttons">
              <div className="download-button">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=""
                ><MdDownloadForOffline />
                </a>
              </div>
              {alreadyLiked?.length !== 0 ? (
                <button type="button" className="liked-button">
                  {photo?.like?.length}  Liked
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    likePhoto(_id);
                  }}
                  type="button"
                  className="like-button"
                >
                  {photo?.like?.length}   {savingPhoto ? 'Liking' : 'Like'}
                </button>
              )}
            </div>
            <div className="bottom-buttons">
            {postedBy?._id === user?.aud && (
           <button
             type="button"
             onClick={(e) => {
               e.stopPropagation();
               deletePhoto(_id);
             }}
             className="delete-button"
           >
             <AiTwotoneDelete />
           </button>
           )
        }
            </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="photo-posted-by">
        <img
          className=""
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="">{postedBy?.userName}</p>
      </Link>

    </div>
  )
}

export default Photo