import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { CSSProperties, useCallback, useMemo } from 'react';
import { useElementHeight } from '../../hooks/useElementHeight';

dayjs.extend(isBetween);

export interface WeekCalendarEventExtractors<TData> {

    start: (event: TData) => Date | string;
    end: (event: TData) => Date | string;

    cell: (props: WeekDayEvent<TData>) => React.ReactNode;

}

export interface WeekCalendarProps<TData> {

    date: Date;

    data?: TData[];
    events: WeekCalendarEventExtractors<TData>;

    verticalPadding?: [number, number];
    hours?: number[];

}

export interface WeekDayHeader {
    date: Date;
    isWeekend: boolean;
}

export interface WeekDayEvent<TData> {

    date: Date;
    isWeekend: boolean;

    startsBefore: boolean;
    endsAfter: boolean;

    event: TData;

    getPosition: () => CSSProperties;

}

export interface WeekDay<TData> {

    date: Date;
    isWeekend: boolean;

    events: WeekDayEvent<TData>[];

}

export interface WeekHourHeader {
    hour: number;
    date: Date;
    getPosition: () => CSSProperties;
}

export interface WeekCalendarInstance<TData> {

    ref: React.RefObject<HTMLDivElement>;
    height: number;

    getDayHeaders: () => WeekDayHeader[];
    getHourHeaders: () => WeekHourHeader[];
    getDays: () => WeekDay<TData>[];

}

interface InternalEvent<TData> {

    date: Date;
    isWeekend: boolean;

    startsBefore: boolean;
    endsAfter: boolean;

    event: TData;

}

export const useWeekCalendar = <TData>(props: WeekCalendarProps<TData>): WeekCalendarInstance<TData> => {

    const {

        date,

        data = [],
        events,

        hours: customHours,

        verticalPadding = [10, 10]

    } = props;

    const start = useMemo(() => dayjs(date).startOf('week'), [date]);

    const { ref, height } = useElementHeight<HTMLDivElement>();

    // Calculate the base days for the week

    const dayNextDay: [Dayjs, Dayjs][] = useMemo(() => {
        const dayNextDay: [Dayjs, Dayjs][] = [];
        let day = start;
        let nextDay = day.add(1, 'day');
        for (let i = 0; i < 7; i++) {
            dayNextDay.push([day, nextDay]);
            day = nextDay;
            nextDay = nextDay.add(1, 'day');
        }
        return dayNextDay;
    }, [start]);

    // Calculate the days and hours

    const days = useMemo(() => {
        return dayNextDay.map(([day]) => ({
            date: day.toDate(),
            isWeekend: day.day() === 0 || day.day() === 6
        }));
    }, [dayNextDay]);

    const hours = useMemo(() => {
        const hoursToUse = customHours || Array.from({ length: 25 }, (_, i) => i);
        return hoursToUse.map(hour => ({
            date: start.add(hour, 'hour').toDate(),
            hour
        }));
    }, [start, customHours]);

    // Then use these days to process events

    const eventsMap = useMemo(() => {

        const eventsByDay = new Map<number, InternalEvent<TData>[]>();

        if (events) {

            // Initialize the map with an empty array for each day in
            // the base. The key of the the map is the valueOf the
            // date, which is also returned by the dayjs function.

            dayNextDay.forEach(([day]) => {
                eventsByDay.set(day.valueOf(), []);
            });

            // Add the events to the map depending on wether they
            // should be displayed on the day or not.

            data.forEach(event => {

                const eventStart = dayjs(events.start(event));
                const eventEnd = dayjs(events.end(event));

                dayNextDay.forEach(([day, nextDay]) => {
                    if (day.isBetween(eventStart, eventEnd, 'day', '[]')) {
                        eventsByDay.get(day.valueOf())!.push({
                            date: day.toDate(),
                            isWeekend: day.day() === 0 || day.day() === 6,
                            startsBefore: eventStart.isBefore(day),
                            endsAfter: eventEnd.isAfter(nextDay),
                            event
                        });
                    }
                });

            });

        }

        return eventsByDay;

    }, [dayNextDay, data, events]);

    console.log(eventsMap);

    // Get the headers

    const getDayHeaders = useCallback(() => {
        return days.map(({ date, isWeekend }) => ({
            date,
            isWeekend
        }));
    }, [days]);

    const getHourHeaders = useCallback(() => {

        const translatedTop = verticalPadding[0];
        const translatedBottom = verticalPadding[1];
        const translatedHeight = height - translatedTop - translatedBottom;

        return hours.map(({ hour, date }) => ({
            hour,
            date,
            getPosition: () => ({
                position: 'absolute',
                top: `${translatedTop + (hour * translatedHeight / 24)}px`
            })
        }));

    }, [height, hours, verticalPadding]);

    // Get the events

    const getEventsForDay = useCallback((date: Dayjs) => {
        return eventsMap.get(date.valueOf()) || [];
    }, [eventsMap]);

    const getDays = useCallback(() => {
        return dayNextDay.map(([day, nextDay]) => ({
            date: day.toDate(),
            isWeekend: day.day() === 0 || day.day() === 6,
            events: getEventsForDay(day).map(({ date, isWeekend, startsBefore, endsAfter, event }) => {

                const eventStart = dayjs(events.start(event));
                const eventEnd = dayjs(events.end(event));

                const startHour = eventStart.isBefore(day) ? 0 : eventStart.hour() + eventStart.minute() / 60;
                const endHour = eventEnd.isAfter(nextDay) ? 24 : eventEnd.hour() + eventEnd.minute() / 60;

                const paddedHeight = height - verticalPadding[0] - verticalPadding[1];

                return {

                    date,
                    isWeekend,

                    startsBefore,
                    endsAfter,

                    event,

                    getPosition: () => ({
                        position: 'absolute',
                        left: 0,
                        top: verticalPadding[0] + (startHour * paddedHeight / 24),
                        right: 0,
                        height: ((endHour - startHour) * paddedHeight / 24)
                    })

                };

            })
        }));
    }, [dayNextDay, getEventsForDay, events, height, verticalPadding]);

    return {
        ref,
        height,
        getDayHeaders,
        getHourHeaders,
        getDays
    };

};

