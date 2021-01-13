import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #cdc9c9;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #cdc9c9;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #b0c4de;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #cdc9c9;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #363636;

    &::placeholder {
      color: #666360;
    }
  }
`;
