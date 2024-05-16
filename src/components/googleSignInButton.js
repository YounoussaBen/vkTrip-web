import React from "react";
import { GoogleLogin } from "react-google-login";
import GoogleLogin from "react-google-login";
import api from "../api";

const GoogleSignInButton = ({ onSuccess, onFailure }) => {

  const clientId = "Your Google client Id";

  const onSuccess = async (res) => {
    console.log('succzddgsfgess:', res.accessToken);
    const user = {
          "grant_type": "convert_token",
          "client_id":"DRF CLIENT ID",
          "client_secret": "DRF CLIENT SECRET",
          "backend":"google-oauth2",
          "token": res.accessToken
        };
        const {data} = await api.post('/auth/social-login/convert-token/', user ,{headers: {
            'Content-Type': 'application/json'
        }}, {withCredentials: true});

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access_token']}`;
        localStorage.clear();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        window.location.href = '/'
  }
  

  const onFailure = (err) => {
    console.log('failed:', err);
  };
  
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleSignInButton;
