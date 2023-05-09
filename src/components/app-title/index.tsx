import React, {FunctionComponent, useMemo} from 'react';
import classnames from 'classnames';
import style from './style.css';

export type AppTitleProps = {
  title: string;
  isBigTitle?: boolean;
};

export const AppTitle: FunctionComponent<AppTitleProps> = ({title, isBigTitle = false}) => {
  const styleButton = useMemo(
    () => classnames(style.toolTitle, isBigTitle ? style.mainTitle : style.regularTitle),
    [isBigTitle]
  );
  return (
    <div className={styleButton} tabIndex={0}>
      {title}
    </div>
  );
};
