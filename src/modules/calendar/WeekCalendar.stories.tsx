import type { Meta, StoryObj } from '@storybook/react-vite';
import { WeekCalendar } from './WeekCalendar';
import { WeekCalendarEventExtractors } from './useWeekCalendar';
import classNames from 'classnames';


interface StoryEvent {
    start: Date;
    end: Date;
    title: string;
}

const data: StoryEvent[] = [
    { start: new Date('2025-02-23T09:00:00'), end: new Date('2025-02-23T10:00:00'), title: 'Event 1' },
    { start: new Date('2025-02-23T10:00:00'), end: new Date('2025-02-23T11:00:00'), title: 'Event 2' },
    { start: new Date('2025-02-23T11:00:00'), end: new Date('2025-02-23T18:00:00'), title: 'Event 3' },
    { start: new Date('2025-02-24T12:00:00'), end: new Date('2025-02-24T13:00:00'), title: 'Event 4' },
    { start: new Date('2025-02-24T13:00:00'), end: new Date('2025-02-24T14:00:00'), title: 'Event 5' },
    { start: new Date('2025-02-25T14:00:00'), end: new Date('2025-02-25T15:00:00'), title: 'Event 6' }
];

const multiDayData: StoryEvent[] = [
    { start: new Date('2025-02-23T09:00:00'), end: new Date('2025-02-23T10:00:00'), title: 'Event 1' },
    { start: new Date('2025-02-23T14:00:00'), end: new Date('2025-02-25T14:00:00'), title: 'Multi-day Event' },
    { start: new Date('2025-02-25T16:00:00'), end: new Date('2025-02-26T08:00:00'), title: 'Event 3' }
];


// Definition

const meta: Meta<typeof WeekCalendar<StoryEvent>> = {
    parameters: {
        layout: 'fullscreen'
    },
    component: WeekCalendar
};

export default meta;
type Story = StoryObj<typeof WeekCalendar<StoryEvent>>;

// Templates


const events: WeekCalendarEventExtractors<StoryEvent> = {

    start: (event) => event.start,
    end: (event) => event.end,

    cell: ({ startsBefore, endsAfter, event, isLargest, getPosition }) => (
        <div className="p-0.5" style={getPosition()}>
            <div
                className={classNames(
                    'w-full h-full flex flex-row items-center justify-center bg-red-400 p-1',
                    {
                        'rounded-t-md': !startsBefore,
                        'rounded-b-md': !endsAfter
                    }
                )}
            >
                {event.title}
                {isLargest && 'Largest'}
            </div>
        </div>
    )

};

const WeekCalendarTemplate: Story = {
    render: (args) => {
        return (
            <div className="w-full h-screen p-2">
                <WeekCalendar {...args} className="min-w-96 min-h-96" />
            </div>
        );
    },
    args: {
        date: new Date('2025-02-23T09:00:00'),
        data,
        events,
        hours: [0, 3, 6, 9, 12, 15, 18, 21, 24],
    }
};

// Stories

export const Basic: Story = {
    ...WeekCalendarTemplate
};

export const WithMultiDayEvent: Story = {
    ...WeekCalendarTemplate,
    args: {
        ...WeekCalendarTemplate.args,
        data: multiDayData
    }
};
