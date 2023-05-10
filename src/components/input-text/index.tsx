import React, {FunctionComponent, useMemo} from 'react';
import {noop, isNil, isEmpty} from 'lodash/fp';

import classnames from 'classnames';
import {getClassState} from '../common';
import style from './style.css';

export type InputTextProps = {
  autoFocus?: boolean;
  title: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  value: string;
  hint?: string;
  error?: string;
  onChange?: Function;
  modified?: boolean;
  'aria-label'?: string;
  'data-name'?: string;
};

export const InputText: FunctionComponent<InputTextProps> = props => {
  const {
    autoFocus = false,
    placeholder = '',
    value,
    hint,
    defaultValue,
    onChange = noop,
    error,
    disabled,
    modified = false,
    title: propsTitle,
    'data-name': dataName = 'input-text',
    'aria-label': ariaLabel = 'Input Text'
  } = props;

  const handleChange = useMemo(() => e => onChange(e.target.value), [onChange]);
  const mainClass = style.coorpmanager;
  const className = getClassState(style.default, style.modified, style.error, modified, !!error);

  const hintView =
    error || hint ? (
      <div
        className={style.hint}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: error || hint}}
      />
    ) : null;

  return (
    <div
      className={classnames(
        mainClass,
        className,
        // disabled && style.disabled,
        isNil(propsTitle) && style.isNoTitle
      )}
    >
      <label>
        <span className={classnames(style.title, isEmpty(value) && style.noValue)}>
          {propsTitle}
        </span>

        <input
          autoFocus={autoFocus}
          type="text"
          name={propsTitle}
          className={style.input}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete={'off'}
          value={value}
          onInput={handleChange}
          disabled={disabled}
          onChange={noop}
          data-name={dataName}
          aria-label={ariaLabel}
          tabIndex={0}
        />
        {hintView}
      </label>
    </div>
  );
};
