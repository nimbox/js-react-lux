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
    isLargest: boolean;

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

    date: Dayjs;

    start: Dayjs;
    end: Dayjs;

    segmentStart: number;
    segmentEnd: number;
    segmentDuration: number;

    isWeekend: boolean;
    isLargest: boolean;

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

                const start = dayjs(events.start(event));
                const end = dayjs(events.end(event));

                let current: InternalEvent<TData> | null | undefined;
                let largestSegmentDuration = Number.MIN_SAFE_INTEGER;

                dayNextDay.forEach(([day, nextDay]) => {
                    if (day.isBetween(start, end, 'day', '[]')) {

                        const segmentStart = start.isBefore(day) ? 0 : start.hour() + start.minute() / 60;
                        const segmentEnd = end.isAfter(nextDay) ? 24 : end.hour() + end.minute() / 60;
                        const segmentDuration = segmentEnd - segmentStart;

                        const segment: InternalEvent<TData> = {

                            date: day,

                            start,
                            end,

                            segmentStart,
                            segmentEnd,
                            segmentDuration,

                            isWeekend: day.day() === 0 || day.day() === 6,
                            isLargest: false,

                            startsBefore: start.isBefore(day),
                            endsAfter: end.isAfter(nextDay),

                            event

                        };

                        eventsByDay.get(day.valueOf())!.push(segment);

                        if (segment.segmentDuration > largestSegmentDuration) {
                            current = segment;
                            largestSegmentDuration = segment.segmentDuration;
                        }

                    }
                });

                if (current != null) {
                    current.isLargest = true;
                }

            });

        }

        return eventsByDay;

    }, [dayNextDay, data, events]);

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
        return dayNextDay.map(([day]) => ({
            date: day.toDate(),
            isWeekend: day.day() === 0 || day.day() === 6,
            events: getEventsForDay(day).map(({ date, segmentStart, segmentEnd, isWeekend, isLargest, startsBefore, endsAfter, event }) => {

                const paddedHeight = height - verticalPadding[0] - verticalPadding[1];

                return {

                    date: date.toDate(),

                    isWeekend,
                    isLargest,

                    startsBefore,
                    endsAfter,

                    event,

                    getPosition: () => ({
                        position: 'absolute',
                        left: 0,
                        top: verticalPadding[0] + (segmentStart * paddedHeight / 24),
                        right: 0,
                        height: ((segmentEnd - segmentStart) * paddedHeight / 24)
                    })

                };

            })
        }));
    }, [dayNextDay, getEventsForDay, height, verticalPadding]);

    return {
        ref,
        height,
        getDayHeaders,
        getHourHeaders,
        getDays
    };

};

