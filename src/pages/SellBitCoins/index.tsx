import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import { Container, Content } from './styles';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErros';

interface SellBitCoinsFormData {
  brlAmount: string;
}

const SellBitCoins: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SellBitCoinsFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          brlAmount: Yup.number().required('Campo Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const token = localStorage.getItem('@Desafio-Eduzz:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const bitCoinPrice = await api.get('btc/price', config);

        const { sell } = bitCoinPrice.data;

        try {
          await api.post(
            'btc/sell',
            {
              amount: data.brlAmount,
            },
            config,
          );

          addToast({
            type: 'success',
            title: 'Venda efetuada!',
            description: `Parabéns você vendeu ${(
              parseFloat(data.brlAmount) / sell
            ).toFixed(6)} bitcoins.`,
          });

          history.push('/dashboard');
        } catch {
          addToast({
            type: 'error',
            title: 'Venda não efetuada!',
            description: `Você não tem essa quantidade em reais.`,
          });

          history.push('dashboard');
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Ocorreu um erro, Tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Valor em Reais que deseja vender</h1>

          <Input name="brlAmount" placeholder="R$" />

          <Button type="submit">Vender</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SellBitCoins;
