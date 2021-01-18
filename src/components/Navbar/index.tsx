import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { SidebarData } from './SidebarData';

import { Container, SideNavbar, Nav, Linker, Logout } from './styles';
import { useAuth } from '../../hooks/auth';

const Navbar: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const history = useHistory();

  const showSidebar = () => setSidebar(!sidebar);
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();

    history.push('/');
  };

  return (
    <Container>
      <SideNavbar>
        <FaIcons.FaBars className="burger-bar" onClick={showSidebar} />
        <Logout onClick={handleSignOut}>
          <div>
            <FiLogOut />
            <p>Logout</p>
          </div>
        </Logout>
      </SideNavbar>
      <IconContext.Provider value={{ color: '#FFFAFA' }}>
        <Nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Linker onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </Linker>
            </li>
            {SidebarData.map(item => {
              return (
                <li key={item.path} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Nav>
      </IconContext.Provider>
    </Container>
  );
};

export default Navbar;
