import React, {FunctionComponent, useMemo} from 'react';
import InputTextArea from '@coorpacademy/components/es/atom/input-textarea';
import InputText from '@coorpacademy/components/es/atom/input-text';
import map from 'lodash/fp/map';
import style from './style.css';

export type GlossaryProps = {
  definitions: [string, string][];
};

const INPUT_FIELD_THEME = 'coorpmanager';

export const Glossary: FunctionComponent<GlossaryProps> = ({definitions = []}) => {
  const descriptions = useMemo(
    () =>
      map(([entry, definition]) => {
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
