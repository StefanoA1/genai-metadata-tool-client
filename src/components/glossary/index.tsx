import React, {FunctionComponent, useMemo} from 'react';
import InputTextArea from '@coorpacademy/components/es/atom/input-textarea';
import InputText from '@coorpacademy/components/es/atom/input-text';
import map from 'lodash/fp/map';
// import {InputText} from '../input-text';
// import {InputTextarea as InputTextArea} from '../input-textarea';
import style from './style.css';

type GlossaryEntry = {name: string; def: string};

export type GlossaryProps = {
  definitions: GlossaryEntry[];
};

const INPUT_FIELD_THEME = 'coorpmanager';

// eslint-disable-next-line react/prop-types
export const Glossary: FunctionComponent<GlossaryProps> = ({definitions = []}) => {
  const descriptions = useMemo(
    () =>
      map(({name: entry, def: definition}: GlossaryEntry) => {
        const entryProps = {
          theme: INPUT_FIELD_THEME,
          disabled: true,
          // onChange: onUrlInput,
          title: 'Entry',
          placeholder: 'The current entry',
          value: entry
        };
        const definitionProps = {
          theme: INPUT_FIELD_THEME,
          disabled: true,
          // onChange: onUrlInput,
          title: 'Definition',
          placeholder: `A definition for: ${entry}`,
          value: definition
        };
        return (
          <div tabIndex={0} key={entry} className={style.glossaryEntry}>
            <InputText {...entryProps} />
            <InputTextArea {...definitionProps} />
          </div>
        );
      }, definitions),
    [definitions]
  );
  return <div className={style.glossaryContainer}>{descriptions}</div>;
};
