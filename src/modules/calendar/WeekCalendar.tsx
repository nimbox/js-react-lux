import dayjs from 'dayjs';
import { useWeekCalendar, WeekCalendarProps } from './useWeekCalendar';
import { Fragment } from 'react/jsx-runtime';
import classNames from 'classnames';


export interface WeekCalendarExtendedProps<TData> extends WeekCalendarProps<TData> {
    className?: string;
}

export const WeekCalendar = <TData,>(props: WeekCalendarExtendedProps<TData>) => {

    const { className, ...rest } = props;

    const calendar = useWeekCalendar(rest);

    // Render

    return (
        <div className={classNames('h-full w-full flex flex-col', className)}>

            <div className="flex-0 flex flex-row"> {/* Header */}

                <div className="flex-0 w-16 relative" /> {/* Header Hours */}

                <div className="flex-1 flex flex-row relative"> {/* Header Days */}

                    <div className="flex-0 w-4 border-r border-calendar-grid" /> {/* Header Lines */}

                    {calendar.getDayHeaders().map(({ date, isWeekend }) => {
                        return (
                            <div
                                key={date.toISOString()}
                                className={classNames(
                                    'flex-1 relative p-2 text-center text-xl border-t border-r border-b border-calendar-grid',
                                    {
                                        'bg-slate-200': isWeekend
                                    }
                                )}
                            >
                                {(() => {
                                    const d = dayjs(date);
                                    return (
                                        <>
                                            <span className="text-sm uppercase">{d.format('ddd')}</span>
                                            <br />
                                            <span className="text-2xl">{d.format('DD')}</span>
                                        </>
                                    );
                                })()}
                            </div>
                        );
                    })}

                </div>

            </div>

            <div ref={calendar.ref} className="flex-1 flex flex-row"> {/* Content */}

                <div className="flex-0 w-16 relative"> {/* Content Hours */}
                    {calendar.getHourHeaders().map(((hour) => (
                        <div
                            key={hour.hour.toString()}
                            className="text-right w-16"
                            style={{ ...hour.getPosition(), transform: 'translateY(-50%)' }}
                        >
                            {dayjs(hour.date).format('ha')}
                        </div>
                    )))}
                </div>

                <div className="flex-1 flex flex-row relative"> {/* Content Days */}

                    <div className="flex-0 w-4 border-r border-calendar-grid z-10"> {/* Content Lines */}
                        {calendar.getHourHeaders().map(((hour) => (
                            <div
                                key={hour.hour.toString()}
                                className="border-b border-calendar-grid"
                                style={{ ...hour.getPosition(), left: 8, right: 0 }}
                            />
                        )))}
                    </div>

                    {calendar.getDays().map(({ date, isWeekend, events }) => (
                        <div
                            key={date.toISOString()}
                            className={classNames(
                                'flex-1 relative border-r border-b border-calendar-grid',
                                {
                                    'bg-slate-100': isWeekend
                                }
                            )}
                        >
                            <div className="absolute inset-0 z-20"> {/* Events */}
                                {events.map((p, i) => (
                                    <Fragment key={i}>
                                        {props.events.cell(p)}
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );

};
