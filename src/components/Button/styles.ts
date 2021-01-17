import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ffffff;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #2f4f4f;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  font-size: 20px;

  &:hover {
    background: ${shade(0.1, '#ffffff')};
  }
`;
