import React from 'react';
import styles from './ErrorPage.module.scss';
import { useRouteError } from 'react-router-dom';

interface IPropsErrorPage {}

interface ErrorType {
  message: string;
  status: number;
  statusText: string;
}
const ErrorPage: React.FC<IPropsErrorPage> = () => {
  const error = useRouteError() as ErrorType | null;
  if (!error) return null;
  return (
    <div id="error-page" className={styles.error}>
      <h1>Oops!</h1>
      <p>Кажется вы ввели некорректный адрес!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
