/* eslint-disable import/no-anonymous-default-export */
import classNames from 'classnames';
import { AngleDownIcon, CalendarIcon, ClockIcon, FullSquareIcon } from '../../icons/components';
import { Field } from './Field';
import { InputField, InputFieldProps } from './InputField';

// Definition

export default {
    title: 'Component/Controls/FieldWrapper',
    component: Field,
};

//  Parameterized



const Parameterized = (props: InputFieldProps) => {

    const {

        label = 'Label',

        className = 'w-full',
        fieldClassName = '',

        ...rest

    } = props;


    return (

        <div className="space-y-4">

            {/* <div className="flex justify-center items-baseline">
                <TextField variant="outlined" label={label} {...rest} />
                <TextField variant="filled" label={label} {...rest} />
                <TextField variant="inlined" label={label} {...rest} />
            </div> */}

            {/* <div className='grid grid-cols-3 gap-4 justify-items-center items-center'>
                <TextField variant="outlined" label={label} {...rest} />
                <TextField variant="filled" label={label} {...rest} />
                <TextField variant="inlined" label={label} {...rest} />
            </div> */}

            <div className='grid grid-cols-3 gap-4 justify-items-center items-center'>
                <InputField variant="outlined" label={label} className={classNames("w-full", className)} fieldClassName={classNames("w-full", fieldClassName)} {...rest} />
                <InputField variant="filled" label={label} className={classNames("w-full", className)} fieldClassName={classNames("w-full", fieldClassName)} {...rest} />
                <InputField variant="inlined" label={label} className={classNames("w-full", className)} fieldClassName={classNames("w-full", fieldClassName)} {...rest} />
            </div>

            {/* <div className='grid grid-cols-3 gap-4 justify-items-center items-baseline'>
                <TextField variant="outlined" label={label} className={classNames("w-full", className)} fieldClassName={classNames("w-full", fieldClassName)} {...rest} />
                <TextField variant="filled" label={label} className={classNames("w-full", className)} fieldClassName={classNames("w-full", fieldClassName)} {...rest} />
                <TextField variant="inlined" label={label} className={classNames("w-full", className)} fieldClassName={classNames("w-full", fieldClassName)} {...rest} />
            </div> */}

        </div>
    );

};
export const S00_Readme = () => (
    <div className="">
        Field is a wrapper for all controls to guarantee a consistent look and feel.
        The filled variant is a little bit wonky when using start icons, do avoid.
        We have made our best effort to render something that looks not as bad.
    </div>
);

export const S11_HasNoFocusHasNoValue = () => <Parameterized />;
export const S12_HasNoFocusHasValue = () => <Parameterized hasValue={true} />;

export const S13_HasFocusHasNoValue = () => <Parameterized focus={true} />;
export const S14_HasFocusHasValue = () => <Parameterized focus={true} hasValue={true} />;

export const S21_HasNoFocusHasNoValueStart = () => <Parameterized start={<FullSquareIcon />} />;
export const S22_HasNoFocusHasValueStart = () => <Parameterized hasValue={true} start={<FullSquareIcon />} />;

export const S23_HasFocusHasNoValueStart = () => <Parameterized focus={true} start={<FullSquareIcon />} />;
export const S24_HasFocusHasValueStart = () => <Parameterized focus={true} hasValue={true} start={<FullSquareIcon />} />;

export const S31_HasNoFocusHasNoValueEnd = () => <Parameterized end={<FullSquareIcon />} />;
export const S32_HasNoFocusHasValueEnd = () => <Parameterized hasValue={true} end={<FullSquareIcon />} />;

export const S33_HasFocusHasNoValueEnd = () => <Parameterized focus={true} end={<FullSquareIcon />} />;
export const S34_HasFocusHasValueEnd = () => <Parameterized focus={true} hasValue={true} end={<FullSquareIcon />} />;

export const S41_HasNoFocusHasNoValueStartEnd = () => <Parameterized start={<FullSquareIcon />} end={<FullSquareIcon />} />;
export const S42_HasNoFocusHasValueStartEnd = () => <Parameterized start={<FullSquareIcon />} hasValue={true} end={<FullSquareIcon />} />;

export const S43_HasFocusHasNoValueStartEnd = () => <Parameterized start={<FullSquareIcon />} focus={true} end={<FullSquareIcon />} />;
export const S44_HasFocusHasValueStartEnd = () => <Parameterized start={<FullSquareIcon />} focus={true} hasValue={true} end={<FullSquareIcon />} />;

export const S51_HasNoFocusHasNoValueStartEndError = () => <Parameterized error={true} start={<FullSquareIcon />} end={<FullSquareIcon />} />;
export const S52_HasNoFocusHasValueStartEndError = () => <Parameterized error={true} start={<FullSquareIcon />} hasValue={true} end={<FullSquareIcon />} />;

export const S53_HasFocusHasNoValueStartEndError = () => <Parameterized error={true} start={<FullSquareIcon />} focus={true} end={<FullSquareIcon />} />;
export const S54_HasFocusHasValueStartEndError = () => <Parameterized error={true} start={<FullSquareIcon />} focus={true} hasValue={true} end={<FullSquareIcon />} />;

export const S61_HasNoFocusHasNoValueStartEndDisabled = () => <Parameterized disabled={true} start={<FullSquareIcon />} end={<FullSquareIcon />} />;
export const S62_HasNoFocusHasValueStartEndDisabled = () => <Parameterized disabled={true} start={<FullSquareIcon />} hasValue={true} end={<FullSquareIcon />} />;
export const S63_HasFocusHasNoValueStartEndDisabled = () => <Parameterized disabled={true} start={<FullSquareIcon />} focus={true} end={<FullSquareIcon />} />;
export const S64_HasFocusHasValueStartEndDisabled = () => <Parameterized disabled={true} start={<FullSquareIcon />} focus={true} hasValue={true} end={<FullSquareIcon />} />;

export const S81_Select = () => <Parameterized end={<AngleDownIcon />} />;
export const S82_Date = () => <Parameterized label="Date" end={<CalendarIcon />} />;
export const S83_Time = () => <Parameterized label="Time" end={<ClockIcon />} />;

export const S91_Select = () => <Parameterized end={<AngleDownIcon />} />;
export const S92_Date = () => <Parameterized label={""} end={<CalendarIcon />} />;
export const S93_Time = () => <Parameterized label={""} end={<ClockIcon />} />;

export const SA1_EmptyStart = () => (
    <div>
        <span>Before</span>
        <Field

            variant="inlined"

            // label={label}
            // shrink={shrink}

            // hasFocus={hasFocusProp || hasFocus}
            // hasValue={hasValueProp || hasValue}

            // disabled={disabled}
            // error={error}

            end={<AngleDownIcon />}


        />
        <span>After</span>

    </div>
);