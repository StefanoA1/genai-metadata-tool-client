import React, {type FunctionComponent, useCallback, useState} from 'react';

import InputText from '@coorpacademy/components/es/atom/input-text';
import {AppTitle} from './components/app-title';
import style from './app-style.css';
import Button from './components/button';
import type {ButtonProps} from './components/button/types';

export type AppProps = {
  test: string;
};

const INPUT_FIELD_THEME = 'coorpmanager';

export const App: FunctionComponent<AppProps> = ({test}: AppProps) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const result = true;
  const onUrlInput = useCallback((value: string) => setVideoUrl(value), []);

  const urlInputProps = {
    theme: INPUT_FIELD_THEME,
    onChange: onUrlInput,
    title: 'Video url',
    placeholder: 'some.video.url/example123',
    autoFocus: true
  };
  const generateButtonProps: ButtonProps = {
    label: 'Generate',
    // eslint-disable-next-line no-console
    onClick: () => console.log('generateButtonProps')
  };

  const titleProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Title',
    placeholder: 'The content title',
    value: 'Some Title'
  };

  return (
    <div className={style.appContainer}>
      <AppTitle title={'Video metadata enhancement tool'} />
      <div className={style.urlInputWrapper}>
        <InputText {...urlInputProps} />
        <Button {...generateButtonProps} />
      </div>
      {result ? (
        <div className={style.basicSection}>
          <div>
            <InputText {...titleProps} />
          </div>
          <div className={style.preview}>{/* <img src={previewContent.src} /> */}</div>
          <div />
        </div>
      ) : null}
      <span>{videoUrl}</span>
    </div>
  );
};
