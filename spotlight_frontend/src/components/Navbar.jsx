import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

function Navbar({ searchTerm, setSearchTerm, user}) {

  const navigate = useNavigate();

    console.log(user);

  if (user) {
    return (
      <div className="search-con">
        <div className="search-bar">
          <IoMdSearch fontSize={20} className="search-icon" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="search-input"
          />
        </div>
        <div className="nav-user-con">
          <Link to={`user-profile/${user?._id}`} className="nav-user-img">
            <img src={user.image} alt="user-pic" />
          </Link>
          <Link to="/create-pin" fontSize={20} className="create-icon">
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  }
    return null;
}

export default Navbar