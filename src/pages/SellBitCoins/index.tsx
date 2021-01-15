import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import Input from '../../components/Input';
import api from '../../services/api';

import { Container, Content } from './styles';
import Button from '../../components/Button';

interface SellBitCoinsFormData {
  bitCoinsAmount: string;
}

const SellBitCoins: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = async (data: SellBitCoinsFormData) => {
    const token = localStorage.getItem('@GoBarber:token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bitCoinPrice = await api.get('btc/price', config);
    const { sell } = bitCoinPrice.data;

    const amountBRL = parseFloat(data.bitCoinsAmount) * sell;

    try {
      await api.post(
        'btc/sell',
        {
          amount: amountBRL,
        },
        config,
      );
      alert(`Parabéns você vendeu ${data.bitCoinsAmount} bitcoins`);
      history.push('/dashboard');
    } catch {
      alert('Não foi possível vender, pois você não possui essa quantidade');
      history.push('dashboard');
    }
  };

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Digite a quantidade de bitcoins que deseja vender</h1>

          <Input name="bitCoinsAmount" placeholder="Quantidade" />

          <Button type="submit">Vender</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SellBitCoins;
