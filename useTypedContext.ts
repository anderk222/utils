import React,{ useContext } from 'react';

export function useTypedContext<T>(context : React.Context<T>) {

  const ctx = useContext(context);

  if (!ctx) throw new Error('you must set your component into <NameContextProvider>');

  return ctx;
}
