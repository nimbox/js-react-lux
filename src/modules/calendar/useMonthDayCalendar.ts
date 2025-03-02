import dayjs, { Dayjs } from 'dayjs';
import { CSSProperties, useCallback, useMemo } from 'react';
import { useElementHeight } from '../../hooks/useElementHeight';


export interface MonthDayCalendarEventExtractors<TData> {

    day: (event: TData) => Date | string;

    cell: (props: MonthDayEvent<TData>) => React.ReactNode;

}

export interface MonthDayCalendarProps<TData> {

    date: Date;
    weeks?: number;

    data?: TData[];
    events: MonthDayCalendarEventExtractors<TData>;

}

export interface WeekDayHeader {

    date: Date;
    isWeekend: boolean;

}

export interface MonthDayEvent<TData> {

    date: Date;
    isWeekend: boolean;
    isToday: boolean;

    event: TData;

    getPosition: () => CSSProperties;

}

export interface MonthDay<TData> {

    date: Date;
    isWeekend: boolean;
    isToday: boolean;

    events: MonthDayEvent<TData>[];

}

export interface MonthDayCalendarInstance<TData> {

    ref: React.RefObject<HTMLDivElement>;
    height: number;

    getDayHeaders: () => WeekDayHeader[];
    getDays: () => MonthDay<TData>[][];

}

interface InternalEvent<TData> {

    date: Dayjs;
    isWeekend: boolean;
    isToday: boolean;

    event: TData;

}

export const useMonthDayCalendar = <TData>(props: MonthDayCalendarProps<TData>): MonthDayCalendarInstance<TData> => {

    const {

        date,
        weeks = 6,

        data = [],
        events

    } = props;

    const start = useMemo(() => dayjs(date).startOf('week'), [date]);
    const { ref, height } = useElementHeight<HTMLDivElement>();

    // Calculate the base days for the weeks

    const weekDayList: Dayjs[][] = useMemo(() => {
        const weekDay: Dayjs[][] = [];
        let d = start;
        for (let week = 0; week < weeks; week++) {
            const weekDays: Dayjs[] = [];
            for (let i = 0; i < 7; i++) {
                weekDays.push(d);
                d = d.add(1, 'day');
            }
            weekDay.push(weekDays);
        }
        return weekDay;
    }, [start, weeks]);

    // Map the events to the days

    const eventsMap = useMemo(() => {

        const eventsByDay = new Map<number, InternalEvent<TData>[]>();

        if (events) {

            // Initialize the map with an empty array for each day in
            // the base. The key of the the map is the valueOf the
            // date, which is also returned by the dayjs function.

            weekDayList.flat().forEach(day => {
                eventsByDay.set(day.valueOf(), []);
            });

            // Add the events to the map

            data.forEach(event => {

                const day = dayjs(events.day(event));
    
                const eventsForDay = eventsByDay.get(day.valueOf());
                if (eventsForDay) {
                    eventsForDay.push({
                        date: day,
                        isWeekend: day.day() === 0 || day.day() === 6,
                        isToday: day.isSame(dayjs(), 'day'),
                        event
                    });
                }

            });

        }

        return eventsByDay;

    }, [weekDayList, data, events]);

    // Get the headers

    const getDayHeaders = useCallback(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const day = dayjs().day(i);
            return {
                date: day.toDate(),
                isWeekend: i === 0 || i === 6
            };
        });
    }, []);

    // Get the events for a day

    const getEventsForDay = useCallback((date: Dayjs) => {
        return eventsMap.get(date.valueOf()) || [];
    }, [eventsMap]);

    const getDays = useCallback(() => {
        return weekDayList.map(week =>
            week.map(day => ({
                date: day.toDate(),
                isWeekend: day.day() === 0 || day.day() === 6,
                isToday: day.isSame(dayjs(), 'day'),
                events: getEventsForDay(day).map(({ date, isWeekend, isToday, event }) => ({
 
                    date: date.toDate(),
                    isWeekend,
                    isToday,
 
                    event,

                    getPosition: () => ({
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0
                    })

                }))
            }))
        );
    }, [weekDayList, getEventsForDay]);

    return {
        ref,
        height,
        getDayHeaders,
        getDays
    };

}; 