import React, {FunctionComponent} from 'react';
import style from './style.css';

export type AppTitleProps = {
  title: string;
};

export const AppTitle: FunctionComponent<AppTitleProps> = ({title}) => {
  return <div className={style.toolTitle}>{title}</div>;
};
