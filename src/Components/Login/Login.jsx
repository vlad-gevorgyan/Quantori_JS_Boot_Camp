import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '../Modalcontext/ModalContext.jsx';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css';

const Modal = ({ open, onLoginSuccess }) => {
  const { closeModal } = useModal();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (!open) return null;

  const handleLogin = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        fetchUserData(data.token);
        onLoginSuccess(data);
      } else {
        console.error('Login failed:', data);
      }
    })
    .catch(error => {
      console.error('An error occurred during login:', error);
    });
  };

  const fetchUserData = (token) => {
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log('User data:', data);
      closeModal();
      navigate('/home');
    })
    .catch(error => {
      console.error('An error occurred while fetching user data:', error);
      handleTokenRefresh();
    });
  };

  const handleTokenRefresh = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          fetchUserData(data.token);
        } else {
          console.error('Token refresh failed:', data);
        }
      })
      .catch(error => {
        console.error('An error occurred while refreshing token:', error);
      });
    } else {
      console.error('No refresh token found');
    }
  };

  return createPortal(
    <>
      {open && <div className={style.overlay}></div>}
      <dialog open={open} className={style.loginModal}>
        <h1 className={style.login}>Login</h1>
        <form>
          <label className={style.email} htmlFor="username">Email</label>
          <input 
            id="username" 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your Email" 
          />
          <label className={style.password} htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
          />
        </form>
        <div className={style.buttons}>
          <button className={style.button} onClick={closeModal}>Cancel</button>
          <button className={style.button} onClick={handleLogin}>Login</button>
        </div>
      </dialog>
    </>,
    document.getElementById('modal')
  );
}

export default Modal;
