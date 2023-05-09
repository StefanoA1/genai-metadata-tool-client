import React, {type FunctionComponent, useCallback} from 'react';
import classnames from 'classnames';
import type {ButtonProps} from './types';
import style from './style.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
const noop = (args?: unknown) => {};

const Button: FunctionComponent<ButtonProps> = props => {
  const {
    label,
    disabled,
    'data-name': dataName,
    'data-testid': dataTestId = 'button-link',
    'aria-label': ariaLabel,
    onClick = noop,
    onKeyDown = noop,
    className,
    customStyle,
    useTitle = true
  } = props;
  const contentView = (
    <div className={style.buttonContent}>
      <span className={style.label}>{label}</span>
    </div>
  );
  const styleButton = classnames(
    className,
    style.button,
    style.primary,
    disabled && style.disabled
  );

  const handleOnClick = useCallback(() => onClick(), [onClick]);

  const handleOnKeyDown = useCallback(_event => onKeyDown(_event), [onKeyDown]);

  return (
    <button
      {...(useTitle && {
        title: ariaLabel || label
      })}
      type="button"
      aria-label={ariaLabel || label}
      data-name={dataName}
      data-testid={dataTestId}
      style={customStyle}
      className={styleButton}
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}
      tabIndex={0}
    >
      {contentView}
    </button>
  );
};

export default Button;
