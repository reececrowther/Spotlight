import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import { categories } from '../utils/data';
import { client } from '../client';
import Spinner from './Spinner';

function CreatePhoto({ user }) {

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePhoto = () => {
    if (title && about && imageAsset?._id && category) {
      const doc = {
        _type: 'photo',
        title,
        about,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };

  return (
    <div className="create-photo-container">
      {fields && (
        <p className="warning-text">Please add all fields.</p>
      )}
      <div className="create-photo-main">
        <div className="create-photo-img-con">
          <div className="upload-img-con">
            {loading && (
              <Spinner />
            )}
            {
              wrongImageType && (
                <p>Wrong file type.</p>
              )
            }
            {!imageAsset ? (
              <label>
                <div className="upload-img-box">
                  <div className="upload-button">
                    <p className="upload-icon">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="upload-text">Click to upload</p>
                  </div>

                  <p className="recommendation-text">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className=""
                />
              </label>
            ) : (
              <div className="uploaded-img">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className=""
                />
                <button
                  type="button"
                  className=""
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-con">
        {user && (
            <div className="form-user-img">
              <img
                src={user.image}
                alt="user-profile"
              />
              <p>{user.userName}</p>
            </div>
          )}
          <div>
            <p className="">Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add your title"
              className="title-input"
            />
          </div>
          <div>
            <p>Add description</p>
            <input
              type="textarea"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Photo description"
              className="about-input"
            />
          </div>
          <div className="select-category">
            <div>
              <p>Choose Pin Category</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="category-input"
              >
                <option value="others" >Select Category</option>
                {categories.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="save-button">
              <button
                type="button"
                onClick={savePhoto}
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePhoto