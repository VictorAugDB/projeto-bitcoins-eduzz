import React, { useRef } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Form } from '@unform/web';
import Input from '../../components/Input';
import api from '../../services/api';

import { Container, Content } from './styles';
import Button from '../../components/Button';
import formatValue from '../../utils/formatValue';

import { useToast } from '../../hooks/toast';

interface BuyBitCoinsFormData {
  bitCoinsAmount: string;
}

const BuyBitCoins: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const submit = (price: number, quantity: string) => {
    confirmAlert({
      title: 'Por favor Confirme',
      message: `Você deseja comprar ${quantity} bitcoins por ${formatValue(
        price,
      )}`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const token = localStorage.getItem('@GoBarber:token');
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };

            await api.post(
              'btc/purchase',
              {
                amount: price,
              },
              config,
            );
            addToast({
              type: 'success',
              title: 'Compra efetuada!',
              description: `Você comprou ${quantity} bitcoins.`,
            });
            history.push('/dashboard');
          },
        },
        {
          label: 'No',
          onClick: () => {
            addToast({
              type: 'info',
              title: 'Compra não efetuada!',
              description: `Você não comprou nenhum bitcoin.`,
            });

            history.push('/dashboard');
          },
        },
      ],
    });
  };

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
      addToast({
        type: 'error',
        title: 'Compra não efetuada!',
        description: `Você não tem dinheiro para comprar essa quantidade.`,
      });

      history.push('/dashboard');
    } else {
      submit(amountBRL, data.bitCoinsAmount);
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
