import React, { useCallback, useRef } from 'react';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import logoEduzz from '../../assets/logo-white.png';

import getValidationErrors from '../../utils/getValidationErros';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { AnimationContainer, Logo } from '../SignIn/styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Digite seu nome'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/account', {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        if (err.response.status === 400) {
          addToast({
            type: 'info',
            title: 'Conta já existente!',
            description: 'Tente colocar dados diferentes',
          });
        } else {
          addToast({
            type: 'error',
            title: 'Error no cadastro',
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
          });
        }
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Logo src={logoEduzz} alt="logo" />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" placeholder="Nome" />
            <Input name="email" placeholder="Email" />
            <Input name="password" placeholder="Senha" type="password" />

            <div className="grau">
              <Link to="/">Retornar para login</Link>
              <Button type="submit">Cadastrar</Button>
            </div>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
