import React from 'react';
import styles from './SideBarItem.module.scss';
import { Link } from 'react-router-dom';

interface IPropsSideBarItem {
  name: string;
  icon: React.ReactNode;
  to: string;
}

const SideBarItem: React.FC<IPropsSideBarItem> = ({ to, icon, name }) => {
  return (
    <Link to={to} className={styles.item}>
      {icon}
      <span>{name}</span>
    </Link>
  );
};

export default SideBarItem;
