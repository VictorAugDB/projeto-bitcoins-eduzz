import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 80vh;

  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 7px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 1px #808080;
  justify-content: center;
  flex-direction: column;

  flex: 1;

  max-width: 600px;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  form h1 {
    text-align: center;
  }
`;
