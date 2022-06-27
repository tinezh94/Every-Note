import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormMoal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormMoal />
      </>
    );
  }

  return (
    <div className='homepage-nav'>
      {/* <div className='homepage-logo-title'> */}
        <a href='/'>
          <img id='logo-image' src='https://cdn-icons-png.flaticon.com/512/889/889669.png' alt='post-it' />
        </a>
        <h1 className='homepage-title'>EveryNote</h1>
      {/* </div>
      <div> */}
        <ul className='nav-buttons-div'>
          <li className='nav-buttons'>
            <NavLink className={'nav-home'} exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
          </li>
        </ul>
      {/* </div> */}
    </div>

  );
}

export default Navigation;
