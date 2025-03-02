import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { MonthDayCalendar } from './MonthDayCalendar';
import { MonthDayCalendarEventExtractors } from './useMonthDayCalendar';


interface StoryEvent {
    day: Date;
    title: string;
}

const data: StoryEvent[] = [
    { day: new Date('2025-02-23'), title: 'Event 1' },
    { day: new Date('2025-02-24'), title: 'Event 2' },
    { day: new Date('2025-02-25'), title: 'Event 3' }
];

const meta: Meta<typeof MonthDayCalendar<StoryEvent>> = {
    parameters: {
        layout: 'fullscreen'
    },
    component: MonthDayCalendar
};

export default meta;
type Story = StoryObj<typeof MonthDayCalendar<StoryEvent>>;

const events: MonthDayCalendarEventExtractors<StoryEvent> = {
    day: (event) => event.day,
    cell: ({ event }) => (
        <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs">{event.title}</span>
        </div>
    )
};

const MonthDayCalendarTemplate: Story = {
    render: (args) => {
        return (
            <div className="w-full h-screen p-2">
                <MonthDayCalendar {...args} className="min-w-96 min-h-96" />
            </div>
        );
    },
    args: {
        date: new Date('2025-02-23'),
        data,
        events
    }
};

export const Basic: Story = {
    ...MonthDayCalendarTemplate
}; 

export const WithDayClick: Story = {
    ...MonthDayCalendarTemplate,
    args: {
        ...MonthDayCalendarTemplate.args,
        onDayClick: (date) => action('day clicked')(date)
    }
};