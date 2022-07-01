import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
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
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='homepage-nav'>
      <div className='homepage-logo-title'>
        <NavLink exact to='/home'>
          <img id='logo-image' src='https://cdn-icons-png.flaticon.com/512/889/889669.png' alt='post-it' />
        </NavLink>
        <h1 className='homepage-title'>EveryNote</h1>
      </div>

      <div className='nav-bar-home-container'>
          <ul className='nav-buttons-div'>
            <li className='nav-buttons'>
              {/* <NavLink className={'nav-home'} exact to="/home">Home</NavLink> */}
            </li>
          </ul>
      </div>

      <div className="nav-bav-user-container">
          <ul className='nav-btn-user-div'>
              {isLoaded && (
                <li>
                  {sessionLinks}
                </li>
                )
              }
          </ul>
      </div>

      <div>
        {sessionUser && (
          <h3>Welcome {sessionUser.username}</h3>
          )
        }
      </div>
    </div>
  );
}

export default Navigation;
