import style from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className={style.nav}>
      <div className={style.items}>
        <NavLink
          to="/home"
          className={({ isActive }) => 
            isActive ? `${style.item} ${style.active}` : style.item
          }
          onClick={scrollToTop}
        >
          Home
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => 
            isActive ? `${style.item} ${style.active}` : style.item
          }
          onClick={scrollToTop}
        >
          Contact
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => 
            isActive ? `${style.item} ${style.active}` : style.item
          }
          onClick={scrollToTop}
        >
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
