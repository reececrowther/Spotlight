import React from 'react';
import {TailSpin} from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className='spinner'>
        <TailSpin 
            color="#F2F2F2"
            height={50}
            width={50}
        />
        <p>{message}</p>
    </div>
  )
}

export default Spinner