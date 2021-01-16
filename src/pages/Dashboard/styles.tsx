import styled from 'styled-components';

export const Container = styled.div``;

export const UserContent = styled.div`
  position: absolute;
  z-index: -1;
  width: 200px;
  height: 500px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 10px 0 0 25px;
  box-shadow: 0 1px 1px #808080;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  div.user-balance p {
    margin-top: 10px;
  }
`;

export const Graphics = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
