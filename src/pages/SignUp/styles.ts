import { shade } from 'polished';
import styled from 'styled-components';
import signInBackgroundImg from '../../assets/splash.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;

  align-items: center;
  justify-content: center;

  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 7px;
  padding: 10px;

  flex: 1;

  max-width: 300px;

  div {
    display: flex;

    align-items: center;
    justify-content: space-between;
  }

  a {
    text-align: center;
    text-decoration: none;
  }

  a:hover {
    background: ${shade(0.1, '#ffffff')};
    border-radius: 10px;
  }
`;
