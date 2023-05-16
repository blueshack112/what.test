//@flow
// Maybe better to use useCookieState here but having two cookie storing logics seems messy.
// Instead, taking a few inspirations
// https://github.com/dqunbp/use-cookie-state
import storageService from './storageService';
import { useState } from 'react';

export const useCookieState = (key: string) => {
  const getCookieValue = () => {
    return storageService.get(key);
  };

  const [internalValue, setInternalValue] = useState(getCookieValue());

  const setCookieValue = (data) => {
    // Both should be the same format to avoid confusions
    storageService.set(key, data);
    setInternalValue(data);
  };

  storageService.cookies.addChangeListener(({ name, value }) => {
    if (name === key && value !== internalValue) {
      setInternalValue(value);
    }
  });

  return [internalValue, setCookieValue];
};
