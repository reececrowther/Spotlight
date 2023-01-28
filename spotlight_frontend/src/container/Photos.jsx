import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, Feed, PhotoDetail, CreatePhoto, Search} from '../components';

function Photos({ user }) {

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='photos-con'>
      <div className='photo-bg'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user}/>
      </div>
      <div className='photos-main'>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/photo-detail/:photoId" element={<PhotoDetail user={user && user} />} />
          <Route path="/create-photo" element={<CreatePhoto user={user && user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Photos