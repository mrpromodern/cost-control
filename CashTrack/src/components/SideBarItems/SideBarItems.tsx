import React from 'react';
import styles from './SideBarItems.module.scss';
import SideBarItem from '../SideBarItem/SideBarItem';

type Items = {
  id: number;
  icon: React.ReactNode;
  name: string;
  to: string;
};
interface IPropsSideBarItems {
  data: Items[];
}

const SideBarItems: React.FC<IPropsSideBarItems> = ({ data }) => {
  return (
    <ul className={styles.list}>
      {data.map(item => {
        return <SideBarItem to={item.to} icon={item.icon} key={item.id} name={item.name} />;
      })}
    </ul>
  );
};

export default SideBarItems;
