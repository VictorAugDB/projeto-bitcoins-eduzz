import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '../../components/Input';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import { Container, Content } from './styles';
import Button from '../../components/Button';
import formatValue from '../../utils/formatValue';
import getValidationErrors from '../../utils/getValidationErros';

interface DepositFormData {
  amount: string;
}

const Deposit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: DepositFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          amount: Yup.number().required('Campo Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = localStorage.getItem('@Desafio-Eduzz:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        await api.post(
          'account/deposit',
          {
            amount: parseFloat(data.amount),
          },
          config,
        );

        addToast({
          type: 'success',
          title: 'Depósito Efetuado!',
          description: `Você depositou ${formatValue(parseFloat(data.amount))}`,
        });

        history.push('/dashboard');
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
          <h1>Digite o valor que deseja depositar</h1>

          <Input name="amount" placeholder="R$" />

          <Button type="submit">Depositar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Deposit;
