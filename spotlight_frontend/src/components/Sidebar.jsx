import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { categories } from '../utils/data';

function Sidebar({ closeToggle, user }) {

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className='sidebar-component'>
      <div className='inner-sidebar-con'>
        <Link 
          to="/"
          className='sidebar-link'
          onClick={handleCloseSidebar}
        >
        <div className='sidebar-logo'>Spotlight Logo</div>
        </Link>
      </div>
      <div className="cat-con">
          <NavLink
            to="/"
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="cat-title">Discover cateogries</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? 'isActive' : 'isNotActive')}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} className="cat-button" />
              {category.name}
            </NavLink>
          ))}
        </div>
        {user && (
        <Link
          to={`user-profile/${user?._id}`}
          className="sidebar-user-con"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} alt="user-profile" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
      </div>
      
    //</div>
  )
}

export default Sidebar