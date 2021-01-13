import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <>
      <Button> Button</Button>
      <Input name="email" placeholder="Email" />
    </>
  );
};

export default SignIn;
