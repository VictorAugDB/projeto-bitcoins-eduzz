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

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    tbody tr {
      box-shadow: 0 1px 1px #808080;
      border-radius: 4px;
    }

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;
    }
    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
