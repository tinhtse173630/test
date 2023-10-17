import React from 'react';
import '../style/style-login.css'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import useAuth from '../hooks/useAuth';


import { useNavigate } from 'react-router-dom';



function Login() {

  const { setAuth } = useAuth();
  

  // Replace with your actual Google OAuth Client ID
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: "Bearer " + response?.access_token },
        }
        );
        const userData = res.data;
       
        // Check if the email ends with "@fpt.edu.vn" or "@fe.edu.vn"
        if (userData.email && (userData.email.endsWith('@fpt.edu.vn') || userData.email.endsWith('@fe.edu.vn'))) {
          console.log(userData);
          // Handle user data here
          setAuth({
            user: userData
          })

          // After successful login, navigate to the Home page
          navigate('/');
        } else {
          // Email doesn't match the allowed domains
          console.log('This account is not in the organization');
          // Handle the error or show a message to the user
          // Show a warning alert
          alert('This account is not in the organization');
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const navigate = useNavigate();



  return (
    <header className="login">
      <div className="thummail">
        <img src="image/background.png" alt="thummail-fptu" />
      </div>

      <div className="themes-login">
        <div className="login_title">
          <h1>Exam Schedule Management System</h1>
        </div>

        <div className="login_form">
          <h3>Sign in</h3>
          <p>Sign in using @fpt.edu.vn for teacher and student</p>
          <a className="btn_google" href="#" onClick={login}>
            <img src="image/google-icon.png" alt="icon-google" /> Login with Google
          </a>
          <br />
          <div className="contact">
            <div className="btn_mail">
              <a href="mailto: sschcm@fe.edu.vn?cc=KHAOTHIHCM@fe.edu.vn&subject=Request Support From ESMS_(Sudent-fill-title-content-here)">
                <img src="image/mail-forward.png" alt="mail-forward" />
              </a>
            </div>
            <div className="btn_hotline">
              <a href="tel: 028.73005585">
                <img src="image/phone-filled.png" alt="hotline" />
              </a>
            </div>
            <div className="btn_web">
              <a href="https://hcmuni.fpt.edu.vn/" rel="noopener" target="_blank">
                <img src="image/world-www.png" alt="website" />
              </a>
            </div>
          </div>

          <div className="footer">
            <p>© Powered by FPT University</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Login;
