import React, {type FunctionComponent, useCallback, useState} from 'react';
import InputTextArea from '@coorpacademy/components/es/atom/input-textarea';
// import classnames from 'classnames';
import {exportContentToJson} from '../utils/export';
import {AppTitle} from './components/app-title';
import style from './app-style.css';
import Button from './components/button';
import type {ButtonProps} from './components/button/types';
import {Glossary} from './components/glossary';
import {InputText, InputTextProps} from './components/input-text';
import {YoutubePreview} from './components/youtube-preview';
import {_fetch} from './api';
import {TitleWithList} from './components/title-with-list';

// export type AppProps = {
//   test?: string;
// };

const INPUT_FIELD_THEME = 'coorpmanager';

export const App: FunctionComponent = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [response, setResponse] = useState(null);
  const onUrlInput = useCallback((value: string) => setVideoUrl(value), []);

  // ----- url -----
  const urlInputProps: InputTextProps = {
    onChange: onUrlInput,
    title: 'Video url',
    placeholder: 'Put your video URL here',
    value: videoUrl
  };

  const generateButtonProps: ButtonProps = {
    label: 'Generate',
    onClick: async () => {
      // eslint-disable-next-line no-console
      console.log('videoUrl:', urlInputProps.value);
      try {
        const _response = await _fetch(
          `https://genai-metadata-back-production.up.railway.app/videos?video_url=${urlInputProps.value}`
        );
        setResponse(_response);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch the resource:', error);
      }
    }
  };

  const exportButtonProps: ButtonProps = {
    label: 'Export to JSON file',
    onClick: () => exportContentToJson()
  };

  // ----- Basic section -----

  // upper section
  const titleProps: InputTextProps = {
    disabled: true,
    // onChange: onUrlInput,
    title: 'Title',
    placeholder: 'The content title',
    value: response.title
  };

  // lower section
  const languageProps: InputTextProps = {
    disabled: true,
    // onChange: onUrlInput,
    title: 'Language',
    placeholder: 'The language of the content',
    value: response.language
  };

  const succinctSummaryProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Succinct Summary',
    placeholder: 'A succinct summary of the video',
    value: response.summary
  };

  const socialsTeaserProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Teaser for socials',
    placeholder: 'The teaser for social media publication',
    value: response.teaser
  };

  // Detailed summary
  const detailedSummaryProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Detailed Summary',
    placeholder: 'Here, you can write a detailed summary for the content',
    value: response.detailed_summary
  };

  const followUpsProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Follow ups',
    placeholder: 'Useful resources to follow on learning',
    value: response.followups
  };

  const assessmentsProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Assessments',
    placeholder: 'Quiz ideas',
    value: response.assessement
  };

  const faqProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'FAQ',
    // placeholder: 'Quiz ideas',
    value: response.faq
  };

  const funFactsProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Fun Facts',
    // placeholder: 'Quiz ideas',
    value: response.fun_fact
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
      <YoutubePreview videoUrl={urlInputProps.value} />
      {response ? (
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

          <div className={style.assessmentsContainer}>
            <InputTextArea {...assessmentsProps} />
          </div>

          <div className={style.faqContainer}>
            <InputTextArea {...faqProps} />
          </div>

          <div className={style.funFactsContainer}>
            <InputTextArea {...funFactsProps} />
          </div>

          {/* <div className={style.keyPhrasesContainer}>
            <InputTextArea {...followUpsProps} />
          </div> */}

          <TitleWithList title={'Acquired Skills'} list={['1st kp', '1st kp']} isSimpleText />

          <TitleWithList title={'Key Phrases'} list={['1st kp', '1st kp']} />

          <TitleWithList title={'Prerequisites'} list={['1st kp', '1st kp']} />

          <AppTitle title={'Glossary'} />
          <Glossary
            definitions={[
              ['Test', 'This is a test'],
              ['Test', 'This is a test'],
              ['Test', 'This is a test'],
              ['Test', 'This is a test'],
              ['Another Test', 'This is another test']
            ]}
          />
          <div />
          <div className={style.exportButtonContainer}>
            <Button {...exportButtonProps} />
          </div>
        </div>
      ) : (
        <div>
          {/* <section>
            <div className={classnames(style.loading, style.loading01)}>
              <span>L</span>
              <span>O</span>
              <span>A</span>
              <span>D</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
            </div>
          </section> */}
          <div className={style.spinnerContainer}>
            <div className={style.spinner} />
          </div>
        </div>
      )}
    </div>
  );
};
