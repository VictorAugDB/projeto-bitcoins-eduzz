import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
} from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue=""
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
