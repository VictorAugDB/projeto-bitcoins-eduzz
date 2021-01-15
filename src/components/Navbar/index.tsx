import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { SidebarData } from './SidebarData';

import { Container, SideNavbar, Nav, Linker } from './styles';

const Navbar: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Container>
      <IconContext.Provider value={{ color: '#000' }}>
        <SideNavbar>
          <FaIcons.FaBars onClick={showSidebar} />
        </SideNavbar>
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
