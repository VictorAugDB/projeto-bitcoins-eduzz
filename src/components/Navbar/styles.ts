import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div``;

export const SideNavbar = styled.div`
  background: #fff;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px #808080;
  padding-left: 25px;

  .burger-bar {
    cursor: pointer;
  }
`;

export const Nav = styled.nav`
  &.menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }

  &.nav-menu {
    background-color: #212121;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
  }

  &.nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  li {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;

    &.nav-text a {
      text-decoration: none;
      color: #fffafa;
      font-size: 18px;
      width: 95%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 16px;
    }

    &.nav-text:hover {
      background: ${shade(0.5, '#212121')};
      border-radius: 4px;
    }

    &.nav-menu-items {
      width: 100%;
    }

    span {
      margin-left: 16px;
    }
  }
`;

export const Logout = styled.div`
  position: absolute;

  right: 55px;

  cursor: pointer;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    margin-left: 5px;
  }

  &:hover {
    background: ${shade(0.5, '#fff')};
    border-radius: 4px;
  }
`;

export const Linker = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px 0;
  margin: 20px 0 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${shade(0.5, '#212121')};
    border-radius: 4px;
  }
`;
