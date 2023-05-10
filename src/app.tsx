import React, {type FunctionComponent, useCallback, useState} from 'react';
import InputTextArea from '@coorpacademy/components/es/atom/input-textarea';
import {exportContentToJson} from '../utils/export';
// import InputText from '@coorpacademy/components/es/atom/input-text';
import {AppTitle} from './components/app-title';
import style from './app-style.css';
import Button from './components/button';
import type {ButtonProps} from './components/button/types';
import {Glossary} from './components/glossary';
import {InputText, InputTextProps} from './components/input-text';

const INPUT_FIELD_THEME = 'coorpmanager';

export const App: FunctionComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoUrl, setVideoUrl] = useState<string>('');
  const result = true;
  const onUrlInput = useCallback((value: string) => setVideoUrl(value), []);

  // ----- url -----
  const urlInputProps: InputTextProps = {
    onChange: onUrlInput,
    title: 'Video url',
    placeholder: 'some.video.url/example123',
    value: 'https://youtu.be/TATblk1LUQI'
  };

  const generateButtonProps: ButtonProps = {
    label: 'Generate',
    // eslint-disable-next-line no-console
    onClick: () => console.log('generateButtonProps')
  };

  const exportButtonProps: ButtonProps = {
    label: 'Export to AirTable',

    onClick: () => exportContentToJson()
  };

  // ----- Basic section -----

  // upper section
  const titleProps: InputTextProps = {
    disabled: true,
    // onChange: onUrlInput,
    title: 'Title',
    placeholder: 'The content title',
    value: 'Some Title'
  };

  // lower section
  const languageProps: InputTextProps = {
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

  const followUpsProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Follow ups',
    placeholder: 'Useful resources to follow on learning',
    value:
      '1. Aurélien Géron - "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow: Concepts, Tools, and Techniques to Build Intelligent Systems" - O\'Reilly Media, 2019 - A practical guide for machine learning beginners and practitioners. https://www.goodreads.com/book/show/38886397-hands-on-machine-learning-with-scikit-learn-keras-and-tensorflow\n\n2. Andrew Ng - "Machine Learning Yearning" - Goodfellow Publishers, 2018 - A book that gives practical advice on how to implement a successful machine learning program'
  };

  // const keyPhrasesProps: InputTextProps = {
  //   disabled: true,
  //   // onChange: onUrlInput,
  //   title: 'Key Phrases',
  //   placeholder: 'Content Key Phrases',
  //   value: 'This is a really important, super key phrase'
  // };

  return (
    <div className={style.appContainer}>
      <AppTitle title={'Turbo Learning'} isBigTitle />
      <div className={style.urlInputContainer}>
        <div className={style.inputContainer}>
          <InputText {...urlInputProps} />
        </div>
        <div className={style.generateButtonContainer}>
          <Button {...generateButtonProps} />
        </div>
      </div>
      {result ? (
        <div className={style.basicSection}>
          <div>
            <InputText {...titleProps} />
          </div>
          <div className={style.basicLowerSection}>
            <div className={style.imageContainer}>
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
          <div className={style.followUpsContainer}>
            <InputTextArea {...followUpsProps} />
          </div>

          {/* <div className={style.keyPhrasesContainer}>
            <InputTextArea {...followUpsProps} />
          </div> */}

          <AppTitle title={'Glossary'} />
          <Glossary
            definitions={[
              ['Test', 'This is a test'],
              ['Another Test', 'This is another test']
            ]}
          />
          <div />
        </div>
      ) : null}
      <div className={style.exportButtonContainer}>
        <Button {...exportButtonProps} />
      </div>
    </div>
  );
};
