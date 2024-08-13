import './App.css';
import MediaQuery from 'react-responsive';
import Header from './Components/Header/Header';
import MobileNavbar from './Components/Header/MobileNavbar/MobileNavbar';
import Background from './Images/Background.svg';
import BackgroundMob from './Images/BackgroundMob.svg';
import Modal from './Components/Login/Login';
import { useModal } from './Components/Modalcontext/ModalContext.jsx';
import { useState, useEffect } from 'react';

function App() {
  const { modal } = useModal();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    console.log('Login successful:', userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <div className='wrapper'>
      <div>
        <MediaQuery minWidth={481}>
          <Header user={user} onLogout={handleLogout} />
        </MediaQuery>
        <MediaQuery maxWidth={480}>
          <MobileNavbar user={user} onLogout={handleLogout} />
        </MediaQuery>
      </div>
      <div className='background'>
        <MediaQuery minWidth={481}>
          <img className='Background' src={Background} />
        </MediaQuery>
        <MediaQuery maxWidth={480}>
          <img className='BackgroundMob' src={BackgroundMob} />
        </MediaQuery>
      </div>
      <Modal open={modal} onLoginSuccess={handleLoginSuccess} />
      <div className='footer'>
        <p>© Quantori JS BootCamp 2024</p>
      </div>
    </div>
  );
}

export default App;
