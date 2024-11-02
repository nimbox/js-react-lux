import { createContext, useContext } from 'react';

export interface FormatterContextType {
    formatDate: (date: Date) => string;
    formatTime: (date: Date) => string;
    formatNumber: (number: number) => string;
}

const defaultFormatter: FormatterContextType = {
    formatDate: (date: Date) => new Intl.DateTimeFormat().format(date),
    formatTime: (date: Date) => formatTime(date),
    formatNumber: (number: number) => new Intl.NumberFormat().format(number)
};

export const FormatterContext = createContext<FormatterContextType>(defaultFormatter);

export const useFormatter = () => useContext(FormatterContext);

// Default formatters

function formatTime(date?: Date | null) {

    if (!date) {
        return '';
    }

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return formattedTime.replace(/\s?(AM|PM)/, match => match.toLowerCase());

}