import React, { useState } from 'react';
import styles from './SideBar.module.scss';
import SideBarItems from '../SideBarItems/SideBarItems';
import { GiExpense } from 'react-icons/gi';
import { v4 as uuid } from 'uuid';
import { CiImport } from 'react-icons/ci';
import { CiExport } from 'react-icons/ci';
import { CiSettings } from 'react-icons/ci';
import { PiMathOperationsFill } from 'react-icons/pi';
import { GrProjects } from 'react-icons/gr';
import { Outlet } from 'react-router-dom';

type Items = {
  id: number;
  icon: React.ReactNode;
  name: string;
  to:string
};

const SideBar: React.FC = () => {
  const sideBarItems = [
    { id: uuid(), icon: <GiExpense />, name: 'Расходы', to:"expenses" },
    { id: uuid(), icon: <PiMathOperationsFill />, name: 'Операции', to:"operations" },
    { id: uuid(), icon: <CiImport />, name: 'Импорт', to:"import" },
    { id: uuid(), icon: <CiExport />, name: 'Экспорт', to:"export" },
    { id: uuid(), icon: <CiSettings />, name: 'Настройки', to: "settings"},
    { id: uuid(), icon: <GrProjects />, name: 'О проекте', to:"about" },
  ];
  const [data, setData] = useState<Items[]>(sideBarItems);
  return (
    <>
      <div id="sidebar" className={styles.sidebar}>
        <h1 className={styles.title}>Меню</h1>
        <SideBarItems data={data} />
      </div>
      <div id="detail" className={styles.detail}>
        <Outlet />
      </div>
    </>
  );
};

export default SideBar;
