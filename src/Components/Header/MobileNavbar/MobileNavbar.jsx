import React, { useState, useEffect } from 'react';
import style from './MobileNavbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../../Modalcontext/ModalContext.jsx';

const MobileNavbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { openModal } = useModal();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  
  useEffect(() => {
    const handleScroll = () => {

      const scrollY = window.scrollY;

      if (scrollY > 1) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const clickOpenModal = () => {
    toggleNavbar(); 
    openModal(); 
  };

  const clickonLogout = () => {
    toggleNavbar(); 
    onLogout(); 
  };


  return (
    <nav className={`${style.nav} ${isOpen ? style.open : ''}`}>
      <div className={style.navbarBrand}>
        <div className={style.navbarLogo}>
        {user ? (
            <img src={user.image} className={style.profileImage} />
          ) : (
            <FontAwesomeIcon icon={faCircleUser} className={`${style.icon} ${style.iconHovered}`} />
          )}
        </div>
        <button className={style.navbarToggler} onClick={toggleNavbar}>
        <FontAwesomeIcon icon={faBars} className={`${style.iconburger} ${isOpen ? style.open : ''}`} />
        </button>
      </div>
      <div className={`${style.navbarLinks} ${isOpen ? style.active : ''}`}>
        <div className={style.items}>
          <div className={style.item}>
            <NavLink to="/home" className={style.item} onClick={toggleNavbar}>
              Home
            </NavLink>
          </div>
          <div className={style.item}>
            <NavLink to="/contact" className={style.item} onClick={toggleNavbar}>
              Contact
            </NavLink>
          </div>
          <div className={style.item}>
            <NavLink to="/about" className={style.item} onClick={toggleNavbar}>
              About
            </NavLink>
          </div>
        </div>
        <div className={style.navbarBtn}>
          {user ? (
              <div className={style.userContainer}>
                <span className={style.userName}>{`${user.firstName} ${user.lastName}`}</span>
                <button className={style.logBtn} onClick={clickonLogout}>Logout</button>
              </div>
            ) : (
              <NavLink 
                to="/login" 
                className={({ isActive }) => isActive ? `${style.logBtn} ${style.active}` : style.logBtn} 
                onClick={clickOpenModal}
              >
                Login
              </NavLink>
            )}
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
