import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { photoDetailMorePhotoQuery, photoDetailQuery } from '../utils/data';
import Spinner from './Spinner';

import '../css/photoDetail.css';

function PhotoDetail({ user }) {

  const { photoId } = useParams();
  const [photos, setPhotos] = useState();
  const [photoDetail, setPhotoDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPhotoDetails = () => {
    const query = photoDetailQuery(photoId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPhotoDetail(data[0]);
        if (data[0]) {
          const query1 = photoDetailMorePhotoQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPhotos(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPhotoDetails();
  }, [photoId]);


  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(photoId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPhotoDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!photoDetail) {
    return (
      <Spinner message="Showing pin" />
    );
  }


  return (
    <>
      {photoDetail && (
        <div className="photo-detail-con" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="photo-detial-img-con">
            <img
              src={(photoDetail?.image && urlFor(photoDetail?.image).url())}
              alt="user-post"
            />
          </div>
          <div className="photo-details">
              <div className="under-img">
                <Link to={`/user-profile/${photoDetail?.postedBy._id}`} className="user-profile-link">
                  <img src={photoDetail?.postedBy.image} alt="user-profile" />
                  <p className="font-bold">{photoDetail?.postedBy.userName}</p>
                </Link>
                <a
                  href={`${photoDetail.image.asset.url}?dl=`}
                  download
                  className="download-photo-button"
                  title='Download Photo'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
            <div>
              <h1 className="photo-title">
                {photoDetail.title}
              </h1>
              <p>{photoDetail.about}</p>
            </div>
            
            <h2>Comments</h2>
            <div className="comments-con">
              {photoDetail?.comments?.map((item) => (
                <div className="comment-user" key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className=""
                    alt="user-profile"
                  />
                  <div className="user-comment">
                    <p className='user-name'>{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="add-comment-con">
              <Link to={`/user-profile/${user._id}`} className="user-link">
                <img src={user.image} alt="user-profile" />
              </Link>
              <input
                className="add-comment-input"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="add-comment-button"
                onClick={addComment}
              >
                {addingComment ? 'Commenting...' : 'Comment'}
              </button>
            </div>
          </div>
        </div>
        
      )}
      {photos?.length > 0 && (
        
        <h2 className="more-title">
          More like this
        </h2>
        
      )} 
      {photos ? ( 
        <MasonryLayout photos={photos} />
       
      ) : (
        <Spinner message="Loading more photos" />
      )}
    </>
  )
}

export default PhotoDetail