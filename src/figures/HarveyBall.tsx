import { FC, SVGProps } from 'react';


export interface HarveyBallProps {

    /**
     * The size of the covered area from 0 to 100. Anything less than 0 would be
     * treated as 0. Anything greater than 100 would be treated as 100.
     */
    cover: number;

    /** 
     * Border width as a percentage of the size of the HarveyBall.
     * @default 5
     */
    border?: number;

    /**
     * Color of the filled area and the border if it exists.
     * @default '#ffffff'
     */
    color?: string;

    /** Color of the background. The background might not be seen if the cover
     * is greater than 100. 
     */
    backgroundColor?: string;

}

export const HarveyBall: FC<HarveyBallProps & SVGProps<SVGSVGElement>> = (props) => {

    // Properties

    const {

        cover = 0,

        border = 5,
        color = '#000000',
        backgroundColor = '#ffffff',

        children

    } = props;

    // Calculate

    const startAngle = 0;
    const finishAngle = cover / 100 * 360;

    const start = polarToCartesian(50, 50, 50, startAngle);
    const finish = polarToCartesian(50, 50, 50, finishAngle);
    const largeArcFlag = finishAngle - startAngle <= 180 ? "0" : "1";

    // Render

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10em"
            height="10em"
            viewBox="0 0 100 100"
            {...props}
        >
            {cover < 100 ?
                <circle cx="50" cy="50" r={50} strokeWidth={0} fill={backgroundColor} /> :
                null
            }
            {cover > 0 ?
                (cover < 100 ?
                    <path d={`M 50 50 L ${start.x} ${start.y} A 50 50 0 ${largeArcFlag} 1 ${finish.x} ${finish.y} Z`} strokeWidth={0} fill={color} /> :
                    <circle cx="50" cy="50" r={50} strokeWidth={0} fill={color} />
                ) :
                null
            }
            {border > 0 && cover < 100 ?
                <circle cx="50" cy="50" r={50 - border / 2} strokeWidth={border} stroke={color} fill="transparent" /> :
                null
            }
            {children &&
                <foreignObject x="0" y="0" width="100" height="100">
                    <div data-xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full">
                        {children}
                    </div>
                </foreignObject>
            }
        </svg>
    );

};

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {

    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };

}