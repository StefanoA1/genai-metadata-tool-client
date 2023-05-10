/* eslint-disable no-nested-ternary */
import React, {type FunctionComponent, useCallback, useState} from 'react';
import InputTextArea from '@coorpacademy/components/es/atom/input-textarea';
import classnames from 'classnames';
import get from 'lodash/fp/get';
import {exportContentToJson} from '../utils/export';
import {AppTitle} from './components/app-title';
import style from './app-style.css';
import Button from './components/button';
import type {ButtonProps} from './components/button/types';
import {Glossary} from './components/glossary';
import {InputText, InputTextProps} from './components/input-text';
import {YoutubePreview} from './components/youtube-preview';
import {_fetch, type ResponseType} from './api';
import {TitleWithList} from './components/title-with-list';

const INPUT_FIELD_THEME = 'coorpmanager';

export const App: FunctionComponent = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isClicked, setIsClicked] = useState(false);
  const [response, setResponse] = useState<ResponseType>(null);
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
      setIsClicked(true);
      try {
        const _response = await _fetch(
          `https://genai-metadata-back-production.up.railway.app/videos?video_url=${urlInputProps.value}`
        );
        setResponse(_response);
        setIsClicked(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch the resource:', error);
      }
    }
  };

  const exportButtonProps: ButtonProps = {
    label: 'Export to JSON file',
    onClick: () => exportContentToJson(response)
  };

  // ----- Basic section -----

  // upper section
  const titleProps: InputTextProps = {
    disabled: true,
    // onChange: onUrlInput,
    title: 'Title',
    placeholder: 'The content title',
    value: get('title', response)
  };

  // lower section
  const languageProps: InputTextProps = {
    disabled: true,
    // onChange: onUrlInput,
    title: 'Language',
    placeholder: 'The language of the content',
    value: get('language', response)
  };

  const succinctSummaryProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Succinct Summary',
    placeholder: 'A succinct summary of the video',
    value: get('summary', response)
  };

  const socialsTeaserProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Teaser for socials',
    placeholder: 'The teaser for social media publication',
    value: get('teaser', response)
  };

  // Detailed summary
  const detailedSummaryProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Detailed Summary',
    placeholder: 'Here, you can write a detailed summary for the content',
    value: get('detailed_summary', response)
  };

  const followUpsProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Follow ups',
    placeholder: 'Useful resources to follow on learning',
    value: get('followups', response)
  };

  const assessmentsProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Assessments',
    placeholder: 'Quiz ideas',
    value: get('assessement', response)
  };

  const faqProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'FAQ',
    // placeholder: 'Quiz ideas',
    value: get('faq', response)
  };

  const funFactsProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Fun Facts',
    // placeholder: 'Quiz ideas',
    value: get('fun_facts', response)
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
                src={response.thumbnail}
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

          <TitleWithList title={'Acquired Skills'} list={response.acquired_skills} />

          <TitleWithList title={'Key Phrases'} list={response.key_phrases} />

          <TitleWithList title={'Prerequisites'} list={response.prerequisites} />

          <AppTitle title={'Glossary'} />
          <Glossary definitions={response.glossary} />
          <div />
          <div className={style.exportButtonContainer}>
            <Button {...exportButtonProps} />
          </div>
        </div>
      ) : isClicked ? (
        <div>
          <section>
            <div className={classnames(style.loading, style.loading01)}>
              <span>L</span>
              <span>O</span>
              <span>A</span>
              <span>D</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
            </div>
          </section>
          <div className={style.spinnerContainer}>
            <div className={style.spinner} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
