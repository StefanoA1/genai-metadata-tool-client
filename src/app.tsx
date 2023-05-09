import React, {FunctionComponent} from 'react';
import {AppTitle} from './components/title/title';
import style from './app-style.css';

export type AppProps = {
  test: string;
};

export const App: FunctionComponent<AppProps> = ({test}: AppProps) => {
  return (
    <div className={style.appContainer}>
      {test}
      <AppTitle title={'Video metadata enhancement tool'} />
    </div>
  );
};
