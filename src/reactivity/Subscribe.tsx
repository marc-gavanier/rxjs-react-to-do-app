import { cloneElement, isValidElement, ReactElement, ReactNode, useEffect, useState } from 'react';
import { Observable } from 'rxjs';

type SubscriptionResult<T> = [value?: T, error?: Error];

type SubscribeChildrenProps<T> = { value?: T; error?: Error };

type SubscribeChildren<T> = ReactElement<SubscribeChildrenProps<T>> | ((props: SubscribeChildrenProps<T>) => ReactNode);

export const useSubscribe = <T,>(to$: Observable<T>, startWith?: T): SubscriptionResult<T> => {
  const [value, setValue] = useState<T | undefined>(startWith);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const subscription = to$.subscribe({ next: setValue, error: setError });
    return () => subscription.unsubscribe();
  }, [to$]);

  return [value, error];
};

const renderChildren = <T,>(children: SubscribeChildren<T>, [value, error]: SubscriptionResult<T>) =>
  isValidElement(children) ? cloneElement(children, { value, error }) : children({ value, error });

export const Subscribe = <T,>({
  to$,
  startWith,
  children
}: {
  to$: Observable<T>;
  startWith?: T;
  children: SubscribeChildren<T>;
}) => renderChildren(children, useSubscribe(to$, startWith));
