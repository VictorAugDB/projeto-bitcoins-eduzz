import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #dcdcdc;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #dcdcdc;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ffd700;
      border-color: #ffd700;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ffd700;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #1c1c1c;

    &::placeholder {
      color: #666360;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px #dcdcdc inset !important;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
