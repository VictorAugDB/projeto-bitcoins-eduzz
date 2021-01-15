import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import Input from '../../components/Input';
import api from '../../services/api';

import { Container, Content } from './styles';
import Button from '../../components/Button';

interface BuyBitCoinsFormData {
  bitCoinsAmount: string;
}

const BuyBitCoins: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = async (data: BuyBitCoinsFormData) => {
    const token = localStorage.getItem('@GoBarber:token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const userBalance = await api.get('account/balance', config);
    const { balance } = userBalance.data;

    const bitCoinPrice = await api.get('btc/price', config);
    const { buy } = bitCoinPrice.data;

    const amountBRL = parseFloat(data.bitCoinsAmount) * buy;

    if (amountBRL > balance) {
      alert('você não tem dinheiro suficiente para comprar essa quantidade');
      history.push('/dashboard');
    } else {
      await api.post(
        'btc/purchase',
        {
          amount: amountBRL,
        },
        config,
      );
      alert(`Parabéns você comprou ${data.bitCoinsAmount} bitcoins`);
      history.push('/dashboard');
    }
  };

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Digite a quantidade de bitcoins</h1>

          <Input name="bitCoinsAmount" placeholder="Quantidade" />

          <Button type="submit">Comprar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default BuyBitCoins;
