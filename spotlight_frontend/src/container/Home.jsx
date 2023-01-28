import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes} from 'react-router-dom';
import { Sidebar, UserProfile} from '../components';
import { userQuery } from '../utils/data';
import Photos from './Photos';
import { client } from '../client';

function Home() {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  

  useEffect(() => {
    const query = userQuery(userInfo?.aud);

    client.fetch(query).then((data) => {
      setUser(data[0]);
      
    })
  }, []);

  useEffect(() => {
    scrollRef.current.scroll(0,0);
  }, [])
  
  

  return (
    <div className='home-con'>
      <div className='sidebar'>
        <Sidebar user={user && user} />
      </div>
      <div className='sidebar-mob'>
        <div className='sidebar-mob-con'>
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
        <div className='page-con' ref={scrollRef}>
          <Routes>
            <Route path='/user-profile/:userId' element={<UserProfile/>} />
            <Route path='/*' element={<Photos user={user && user}/>} />
          </Routes>
        </div>
    </div>
  )
}

export default Home