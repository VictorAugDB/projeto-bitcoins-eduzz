import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';
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

  align-items: center;
  justify-content: center;

  flex: 1;

  max-width: 300px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  div {
    display: flex;

    align-items: center;
    justify-content: space-between;
  }

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
    }

    a:hover {
      background: ${shade(0.1, '#ffffff')};
      border-radius: 10px;
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ffffff')};
    }
  }
`;
