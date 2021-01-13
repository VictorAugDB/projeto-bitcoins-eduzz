import React from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content, Buttons } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Senha" type="password" />

        <Buttons>
          <Button>Recuperar Acesso</Button>
          <Button>Entrar</Button>
        </Buttons>
      </Content>
    </Container>
  );
};

export default SignIn;
