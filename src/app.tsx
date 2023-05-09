import React, {type FunctionComponent, useCallback, useState} from 'react';

import InputTextArea from '@coorpacademy/components/es/atom/input-textarea';
import InputText from '@coorpacademy/components/es/atom/input-text';
import {AppTitle} from './components/app-title';
import style from './app-style.css';
import Button from './components/button';
import type {ButtonProps} from './components/button/types';

// export type AppProps = {
//   test?: string;
// };

const INPUT_FIELD_THEME = 'coorpmanager';

export const App: FunctionComponent = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const result = true;
  const onUrlInput = useCallback((value: string) => setVideoUrl(value), []);

  // ----- url -----
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

  // ----- Basic section -----

  // upper section
  const titleProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Title',
    placeholder: 'The content title',
    value: 'Some Title'
  };

  // lower section
  const languageProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Language',
    placeholder: 'The language of the content',
    value: 'English'
  };

  const succinctSummaryProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Succinct Summary',
    placeholder: 'A succinct summary of the video',
    value: 'A really, concrete, non repetitive succinct summary'
  };

  const socialsTeaserProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Teaser for socials',
    placeholder: 'The teaser for social media publication',
    value: 'Heads up! This teasers are trending!'
  };

  // Detailed summary
  const detailedSummaryProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Detailed Summary',
    placeholder: 'Here, you can write a detailed summary for the content',
    value:
      "Vastness is bearable only through love Flatland billions upon billions Jean-François Champollion paroxysm of global death something incredible is waiting to be known? The sky calls to us dispassionate extraterrestrial observer realm of the galaxies made in the interiors of collapsing stars tingling of the spine tingling of the spine. Dream of the mind's eye two ghostly white figures in coveralls and helmets are softly dancing dream of the mind's eye are creatures of the cosmos two ghostly white figures in coveralls and helmets are softly dancing not a sunrise but a galaxyrise."
  };

  return (
    <div className={style.appContainer}>
      <AppTitle title={'Video metadata enhancement tool'} isBigTitle />
      <div className={style.urlInputWrapper}>
        <InputText {...urlInputProps} />
        <Button {...generateButtonProps} />
      </div>
      {result ? (
        <div className={style.basicSection}>
          <div>
            <InputText {...titleProps} />
          </div>
          <div className={style.basicLowerSection}>
            <div className={style.imageWrapper}>
              <img
                src="https://placehold.co/256x256/png"
                alt="your image description"
                className={style.contentImage}
              />
            </div>
            <div className={style.basicLowerSectionContent}>
              <InputText {...languageProps} />
              <InputTextArea {...succinctSummaryProps} />
              <InputTextArea {...socialsTeaserProps} />
            </div>
          </div>
          <div className={style.detailedSummarySection}>
            <InputTextArea {...detailedSummaryProps} />
          </div>
          {/* <div className={style.preview}>

          </div> */}
          <div />
        </div>
      ) : null}
      <span>{videoUrl}</span>
    </div>
  );
};
