import dayjs from 'dayjs';
import { useMonthDayCalendar, MonthDayCalendarProps } from './useMonthDayCalendar';
import { Fragment } from 'react';
import classNames from 'classnames';


export interface MonthDayCalendarExtendedProps<TData> extends MonthDayCalendarProps<TData> {
    className?: string;
}

export const MonthDayCalendar = <TData,>(props: MonthDayCalendarExtendedProps<TData>) => {

    const { className, ...rest } = props;
    const calendar = useMonthDayCalendar(rest);

    return (
        <div className={classNames('h-full w-full flex flex-col', className)}>
            <div className="flex-0 flex flex-row"> {/* Header */}
                {calendar.getDayHeaders().map(({ date, isWeekend }) => (
                    <div
                        key={dayjs(date).format('ddd')}
                        className={classNames(
                            'flex-1 p-2 text-center first:border-l border-r border-t border-b border-calendar-border',
                            {
                                'bg-calendar-weekend': isWeekend
                            }
                        )}
                    >
                        <span className="uppercase">{dayjs(date).format('ddd')}</span>
                    </div>
                ))}
            </div>

            <div ref={calendar.ref} className="flex-1 flex flex-col"> {/* Content */}
                {calendar.getDays().map((week, weekIndex) => (
                    <div key={weekIndex} className="flex-1 flex flex-row">
                        {week.map(({ date, isToday, isWeekend, events }) => (
                            <div
                                key={date.toISOString()}
                                className={classNames(
                                    'flex-1 relative first:border-l border-r border-b border-calendar-border p-1 hover:text-white hover:bg-secondary-500 cursor-pointer',
                                    {
                                        'bg-calendar-weekend': isWeekend,
                                        'text-white bg-info-500': isToday
                                    }
                                )}
                            >
                                <div className="absolute top-0 left-0 text-sm p-1 z-20">
                                    {dayjs(date).format('D')}
                                </div>
                                <div className="absolute inset-0 z-10 overflow-auto">
                                    {events.map((p, i) => (
                                        <Fragment key={i}>
                                            {props.events.cell(p)}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

}; 