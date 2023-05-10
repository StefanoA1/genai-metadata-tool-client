/* eslint-disable react/prop-types */
import React, {useMemo} from 'react';
import {noop, isEmpty} from 'lodash/fp';
import classnames from 'classnames';
import {getClassState} from '../common';
import style from './style.css';

const themeStyle = {
  setup: style.setup,
  coorpmanager: style.coorpmanager,
  cockpit: style.cockpit,
  default: style.default
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const InputTextarea = props => {
  const {
    title: propsTitle,
    name,
    placeholder,
    value,
    hint,
    theme = 'default',
    onChange = noop,
    error,
    valid,
    description,
    disabled,
    modified = false
  } = props;

  const mainClass = themeStyle[theme];
  const className = getClassState(style.default, style.modified, style.error, modified, error);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChange = useMemo(() => e => onChange(e.target.value), [onChange]);

  const descriptionView =
    description && theme !== 'coorpmanager' ? (
      <div className={style.description}>{description}</div>
    ) : null;
  const toolTipView =
    description && theme === 'coorpmanager' ? (
      <div className={style.infoIconWrapper}>
        <div className={style.infoIcon} />
        <div className={style.descriptionLabel}>{description}</div>
      </div>
    ) : null;
  const hintView =
    theme === 'coorpmanager' ? (
      <div
        className={style.hint}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: error || hint}}
      />
    ) : null;
  const errorIconView = error ? <div className={style.leftIcon} /> : null;
  const validIconView = valid ? <div className={style.leftIcon} /> : null;

  return (
    <div className={classnames(mainClass, className, disabled && style.disabled)}>
      <label>
        <span className={classnames(style.title, isEmpty(value) && style.noValue)}>
          {propsTitle}
          {toolTipView}
        </span>
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          data-testid={name}
        />
        {errorIconView}
        {validIconView}
        {hintView}
      </label>
      {descriptionView}
    </div>
  );
};
