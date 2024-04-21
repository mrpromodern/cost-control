import React, { useState } from 'react';
import styles from './ExpensesPage.module.scss';
interface IPropsExpensesPage {}

const ExpensesPage: React.FC<IPropsExpensesPage> = ({}) => {
  // Переменная хранящая данные с бэкэнда
  const [expenses, setExpenses] = useState();
  return (
    <div>
      <h2>Все расходы</h2>
      {!expenses ? <p className={styles.nothing}>У вас пока нет никаких расходов!</p> : ''}
    </div>
  );
};

export default ExpensesPage;
