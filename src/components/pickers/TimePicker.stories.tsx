/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import { select, withKnobs } from "@storybook/addon-knobs";
import React, { useRef, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import '../../index.css';
import { TimePicker } from './TimePicker';


const languages = ['en', 'es'];

export default {
    title: 'Component/Picker/TimePicker',
    decorators: [
        withKnobs,
        (story: () => React.ReactNode) => <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
    ]
};

export const Simple = () => {

    const { i18n } = useTranslation();
    const [language, setLanguage] = useState('en');
    const selectedLanguage = select('Language', languages, languages[0]);
    if (language !== selectedLanguage) {
        i18n.changeLanguage(selectedLanguage, () => setLanguage(selectedLanguage));
    }

    const [time, setTime] = useState('08:30am');

    return (
        <div className="p-10">
            <TimePicker name="time" value={time} onChange={(d) => setTime(d.target.value)} />
        </div>
    );

};

export const Uncontrolled = () => {

    const ref = useRef<any>();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        action('submit')(ref.current.value);
        console.log("ref", ref.current.value);
    };
    
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState('en');
    const selectedLanguage = select('Language', languages, languages[0]);
    if (language !== selectedLanguage) {
        i18n.changeLanguage(selectedLanguage, () => setLanguage(selectedLanguage));
    }

    return (
        <div className="p-10">
            <TimePicker name="time" ref={ref} defaultValue='08:30am' />
        </div>
    );

};
