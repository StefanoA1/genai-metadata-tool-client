import React, {FunctionComponent, useMemo} from 'react';
import InputTextArea from '@coorpacademy/components/es/atom/input-textarea';
import map from 'lodash/fp/map';
import {InputText} from '../input-text';
import {AppTitle} from '../app-title';
import style from './style.css';

export type TitleWithListProps = {
  title: string;
  list: string[];
  isSimpleText?: boolean;
};

const INPUT_FIELD_THEME = 'coorpmanager';

export const TitleWithList: FunctionComponent<TitleWithListProps> = ({
  title,
  list = [],
  isSimpleText
}) => {
  let counter = 1;
  const descriptions = useMemo(
    () =>
      map((entry: string) => {
        const _title = `${title} - ${counter}`;
        const entryProps = {
          theme: INPUT_FIELD_THEME,
          disabled: true,
          // onChange: onUrlInput,
          title: _title,
          // placeholder: `A definition for: ${entry}`,
          value: entry
        };
        counter++;
        return (
          <div tabIndex={0} key={_title + counter} className={style.listEntry}>
            {isSimpleText ? <InputText {...entryProps} /> : <InputTextArea {...entryProps} />}
          </div>
        );
      }, list),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list, title, isSimpleText]
  );
  return (
    <div>
      <AppTitle title={title} />
      <div className={style.listContainer}>{descriptions}</div>
    </div>
  );
};
