import React from 'react';
import { urlFor } from '../client';

function Photo({ photo: {postedBy, image, _id} }) {
  return (
    <div>
        <img src={urlFor(image).width(250).url()} alt="User Post"/>
    </div>
  )
}

export default Photo