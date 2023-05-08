import React, {FunctionComponent} from 'react';

export type AppProps = {
  test: string;
};

export const App: FunctionComponent<AppProps> = ({test}: AppProps) => {
  return <div>{test}</div>;
};
