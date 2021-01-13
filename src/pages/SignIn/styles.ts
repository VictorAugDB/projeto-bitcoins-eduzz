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

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  max-height: 234px;
  max-width: 300px;
`;

export const Buttons = styled.div`
  display: flex;
`;
