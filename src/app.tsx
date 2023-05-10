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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [result, setResult] = useState(null);
  const onUrlInput = useCallback((value: string) => setVideoUrl(value), []);

  // ----- url -----
  const urlInputProps: InputTextProps = {
    onChange: onUrlInput,
    title: 'Video url',
    placeholder: 'some.video.url/example123',
    value: 'https://youtu.be/D8gpV-xjECM?t=52'
  };

  const generateButtonProps: ButtonProps = {
    label: 'Generate',
    onClick: async () => {
      // eslint-disable-next-line no-console
      console.log('videoUrl:', urlInputProps.value);
      try {
        const response = await _fetch(
          `https://genai-metadata-back-production.up.railway.app/videos?video_url=${urlInputProps.value}`
        );
        // eslint-disable-next-line no-console
        console.log('response:', response);
        setResult(response);
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

  const assessmentsProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Assessments',
    placeholder: 'Quiz ideas',
    value:
      'Quiz:\n\n1. Knowing math is not necessary for machine learning.\n- False. Knowing the underlying math provides a better understanding of how the algorithms work and makes it easier to solve problems. Plus, math can add to the excitement of the topic.\n- Fun fact: Alan Turing was known for creating the concept of the Universal Machine, which was a mathematical notion that laid the foundation for computer science.\n\n'
  };

  const faqProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'FAQ',
    // placeholder: 'Quiz ideas',
    value:
      'Quiz:\n\n1. Knowing math is not necessary for machine learning.\n- False. Knowing the underlying math provides a better understanding of how the algorithms work and makes it easier to solve problems. Plus, math can add to the excitement of the topic.\n- Fun fact: Alan Turing was known for creating the concept of the Universal Machine, which was a mathematical notion that laid the foundation for computer science.\n\n'
  };

  const funFactsProps = {
    theme: INPUT_FIELD_THEME,
    disabled: true,
    // onChange: onUrlInput,
    title: 'Fun Facts',
    // placeholder: 'Quiz ideas',
    value:
      '1. Benjamin Franklin once said, "A small leak will sink a great ship." This applies to habits as well, as small, seemingly insignificant behaviors can add up over time and greatly impact our lives.\n\n2. According to a study, people who kept a food journal lost twice as much weight as those who didn\'t. This shows the power of keeping track of our habits and behaviors to improve them.\n\n3. The "mere-exposure effect" suggests that the more we are exposed to something, the more we like it. Applying this to habits, the more we expose ourselves to good habits, the more likely we are to enjoy and continue them.'
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
