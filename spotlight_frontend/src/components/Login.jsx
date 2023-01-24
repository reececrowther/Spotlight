import React from 'react';
import '../css/login.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { FcGoogle } from 'react-icons/fc';
import  bgVideo  from '../assets/share.mp4';
import { client } from '../client';

function Login() {

  const navigate = useNavigate();

  const googleResponse = (response) => {
    const token = response.credential;
    var decoded = jwt_decode(token);
    console.log(decoded);

    localStorage.setItem('user', JSON.stringify(decoded));
    
    const googleId = response.clientId;
    const { name, picture } = decoded;

    const doc = {
      _id: googleId,
      _type: 'user', 
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', { replace: true })
    })

  }



  return (
    <div className='login-section'>
      <div className='login-con'>
        <video 
          src={bgVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='bg-video'
        />
        <div className='login-form'>
          <div className='logo'>
            Spotlight Logo
          </div>
          <div className='google-signin'>
            <GoogleLogin 
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN} 
              render={(renderProps) => (
                <button
                  type='button'
                  className='google-button'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle /> Sign in with Google
                </button>
              )}
              onSuccess={googleResponse}
              onFailure={googleResponse}
              cookiePolicy="single_host_origin"
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login