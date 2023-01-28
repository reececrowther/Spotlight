import React from 'react';
import Masonry from 'react-masonry-css';
import Photo from './Photo';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

function MasonryLayout({ photos }) {
  return (
  <Masonry className="photo-grid" breakpointCols={breakpointColumnsObj}>
    {photos?.map((photo) => <Photo key={photo._id} photo={photo} className="w-max" />)}
  </Masonry>
  )
}

export default MasonryLayout