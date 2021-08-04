import { action } from "@storybook/addon-actions";
import React, { useRef, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import '../../index.css';
import { DatePicker } from './DatePicker';


const languages = ['en', 'es'];

export default {
    title: 'Component/Picker/DatePicker',
    decorators: [
        (story: () => React.ReactNode) => <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
    ]
};

export const Simple = () => {

    const { i18n } = useTranslation();
    const [language, setLanguage] = useState('en');
    const selectedLanguage = languages[1];
    if (language !== selectedLanguage) {
        i18n.changeLanguage(selectedLanguage, () => setLanguage(selectedLanguage));
    }

    const [date, setDate] = useState('19-12-1967');

    return (
        <div className="p-10">
            <DatePicker name="date" shortcuts={false} value={date} onChange={(d) => setDate(d.target.value)} />
        </div>
    );

};

export const WithShortcuts = () => {

    const { i18n } = useTranslation();
    const [language, setLanguage] = useState('en');
    const selectedLanguage = languages[1];
    if (language !== selectedLanguage) {
        i18n.changeLanguage(selectedLanguage, () => setLanguage(selectedLanguage));
    }

    const [date, setDate] = useState('19-12-1967');

    return (
        <div className="p-10">
            <DatePicker name="date" shortcuts={true} value={date} onChange={(d) => setDate(d.target.value)} />
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
        <form onSubmit={handleSubmit} className="p-10">
            <DatePicker name="date" shortcuts={true} ref={ref} defaultValue='19-12-1967' />
            <button type="submit">Enviar</button>
        </form>
    );


}
