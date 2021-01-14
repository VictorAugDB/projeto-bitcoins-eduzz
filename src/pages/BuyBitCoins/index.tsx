import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import Input from '../../components/Input';
import api from '../../services/api';

import { Container, Content } from './styles';
import Button from '../../components/Button';

interface DepositFormData {
  amount: number;
}

const BuyBitCoins: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = async ({ amount }: DepositFormData) => {
    const token = localStorage.getItem('@GoBarber:token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await api.post(
      'account/balance',
      {
        amount,
      },
      config,
    );

    alert('Valor depositado!');

    history.push('/dashboard');
  };

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Digite o valor que deseja depositar</h1>

          <Input name="amount" placeholder="R$" />

          <Button type="submit">Depositar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default BuyBitCoins;
