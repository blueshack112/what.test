//@flow
import React from 'react';
import { useCallback } from 'react';
import type { Node } from 'react';
import { getCrudNonFieldErrorMessages } from '../util';
import { T } from 'lib/lioness';

export const showCrudErrorToast = (err: *, addToast: Function, defaultContent: Node) => {
  getCrudNonFieldErrorMessages(err).forEach((msg: string | null) => {
    addToast(msg ? <T>{msg}</T> : defaultContent, {
      appearance: 'error',
      autoDismiss: true,
    });
  });
};

export const showCrudSuccessToast = (content: Node, addToast: Function) =>
  addToast(content, { appearance: 'success', autoDismiss: true });

export const useCrudResponseToasts = (addToast: Function) => {
  return [
    useCallback((content: Node) => showCrudSuccessToast(content, addToast), [addToast]),
    useCallback(
      (response: *, defaultContent: Node) => showCrudErrorToast(response, addToast, defaultContent),
      [addToast]
    ),
  ];
};
