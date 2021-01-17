import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const UserContent = styled.div`
  display: flex;
  flex: 1;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 25px;
  box-shadow: 0 1px 1px #808080;
  justify-content: space-around;

  div.user-balance {
    display: flex;
    flex-direction: column;
  }

  div.bitcoins-price {
    display: flex;
    flex-direction: column;
  }

  div p {
    margin-top: 10px;
  }
`;

export const Graphics = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
