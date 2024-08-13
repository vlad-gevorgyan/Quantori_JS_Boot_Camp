import { Link, NavLink, Navigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../Modalcontext/ModalContext.jsx';
import style from './Header.module.css';
import Navbar from './Navbar/Navbar';

const Header = ({ user, onLogout }) => {
  const location = useLocation();
  const { openModal } = useModal();

  if (location.pathname === '/') {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className={style.nav}>
      <div className={style.navbarContainer}>
        <div className={style.navbarContainer1}>
          <div className={style.navbarLogo}>
            <Link to='/home' className={style.framelink} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {user ? (
                <img src={user.image} className={style.profileImage} />
              ) : (
                <FontAwesomeIcon icon={faCircleUser} className={`${style.icon} ${style.iconHovered}`} />
              )}
            </Link>
          </div>
          <Navbar />
        </div>
        <div className={style.navbarContainer2}>
          {user ? (
            <div className={style.userContainer}>
              <span className={style.userName}>{`${user.firstName} ${user.lastName}`}</span>
              <button className={style.logoutBtn} onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? `${style.loginBtn} ${style.active}` : style.loginBtn} 
              onClick={openModal}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
