import { useRef, useState, useContext, useEffect } from 'react';
import { useAnimationState, MotiText } from 'moti';
import { Column } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { TextInput } from 'react-native';

const Input = ({ value, setValue, disabled, label, mask, props, placeholder }) => {
  const { font, color } = useContext(ThemeContext);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();

  const inputAnimation = useAnimationState({
    from: { translateY: 12, fontSize: 18, backgroundColor: '#fff', paddingHorizontal: 6 },
    to: { translateY: -12, fontSize: 14, backgroundColor: '#fff', paddingHorizontal: 6 },
  });

  useEffect(() => {
    if (value?.length > 0) {
      inputAnimation.transitionTo('to');
    } else {
      inputAnimation.transitionTo('from');
    }
  }, []);

  const handleFocus = () => {
    setFocus(true); inputAnimation.transitionTo('to');
  }
  const handleBlur = () => {
    if (!value?.length > 0) {
      inputAnimation.transitionTo('from'); setFocus(false);
    }
    else {
      setFocus(false)
    }
  }

  const applyMask = (text) => {
    if (!mask) return text;

    // Aplica uma máscara de expressão regular (regex) ou função de máscara personalizada
    if (typeof mask === 'string') {
      // Exemplo simples de aplicação de regex
      return text.replace(new RegExp(mask), '');
    } else if (typeof mask === 'function') {
      // Função de máscara personalizada
      return mask(text);
    }

    return text;
  };

  const handleChangeText = (text) => {
    const { maskFunction, maxLength } = getMaskFunction(mask);
    let maskedText = maskFunction(text);

    if (maxLength && maskedText.length > maxLength) {
      maskedText = maskedText.slice(0, maxLength);
    }

    setValue(maskedText);
  };


  return (
    <Column style={{ borderColor: disabled ? '#f1f1f1' : focus ? color.sc.sc3 : color.sc.sc3 + 50, backgroundColor: '#fff', flexGrow: 1, borderWidth: 2, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 16, }}>
      <MotiText
        state={inputAnimation}
        style={{ fontFamily: font.medium, color: '#788BA4', position: 'absolute', top: 0, left: 12, letterSpacing: -0.6, }}
        transition={{ type: 'timing', duration: 200 }}
      >
        {label}
      </MotiText>

      <TextInput
      {...props}
        style={{ fontSize: 18, fontFamily: font.medium, color: disabled ? color.title + 60 : '#425a7a', }}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={() => setFocus(false)}
        editable={!disabled}
        onChangeText={handleChangeText}
        value={value}
      />
    </Column>
  );
};

export default Input;

const getMaskFunction = (mask) => {
  switch (mask) {
    case 'CPF':
      return { maskFunction: applyCpfMask, maxLength: 14 };
    case 'PHONE':
      return { maskFunction: applyPhoneMask, maxLength: 16 };
    default:
      return { maskFunction: (text) => text, maxLength: undefined };
  }
};

const applyCpfMask = (text) => {
  return text
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto após os três primeiros dígitos
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto após os três próximos dígitos
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona um traço antes dos dois últimos dígitos
};

const isValidEmail = (text) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};
const applyPhoneMask = (text) => {
  return text
    .replace(/\D/g, '') // Remove tudo que não é dígito
    .replace(/^(\d{2})(\d)/, '($1) $2') // Adiciona parênteses em volta dos dois primeiros dígitos e um espaço após o próximo dígito
    .replace(/(\d{1})(\d{4})(\d{4})$/, '$1 $2-$3') // Adiciona o espaço após o primeiro dígito do número e o traço antes dos últimos quatro dígitos
};
