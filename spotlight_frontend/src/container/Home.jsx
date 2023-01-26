import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes} from 'react-router-dom';
import { Sidebar, UserProfile} from '../components';
import { userQuery } from '../utils/data';
import Photo from './Photos';
import { client } from '../client';

function Home() {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.aud);

    client.fetch(query).then((data) => {
      setUser(data[0]);
      
    })
  }, []);
  

  return (
    <div className='home-con'>
      <div className='sidebar'>
        <Sidebar user={user && user} />
      </div>
      <div className='sidebar-mob'>
        <HiMenu fontSize={40} className="hamburger" onClick={() => setToggleSidebar(true)}/>
        <Link to="/">
          Spotlight Logo
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="" />
        </Link>
      </div>
      {toggleSidebar && (
        <div className="sidebar-ani">
          <div className="sidebar-close">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar closeToggle={setToggleSidebar} user={user && user} />
        </div>
        )}
    </div>
  )
}

export default Home