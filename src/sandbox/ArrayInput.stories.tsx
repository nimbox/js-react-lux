/* eslint-disable import/no-anonymous-default-export */
import { action } from 'storybook/actions';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Wrapper } from '..';
import { Input } from '../components/inputs/Input';
import { Tag } from '../components/Tag';


export default {
    title: 'Sandbox/ArrayInput',
    parameters: { layout: 'centered' }
};


export const Default = () => {

    const { register, setValue, handleSubmit, reset } = useForm<{ choices: string[] }>({ defaultValues: { choices: ['123'] } });
    const onSubmit = (data: any) => console.log(data);

    // const [value, setValue] = useState<any>(["asd"]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <select multiple {...register('choices')}>
                    {/* <option value="asd">asd</option>
                    <option value="123">asd</option>
                    <option value="444">444</option> */}
                </select>
                <Button onClick={() => setValue('choices', ['asd', 'xxx'])}>setValue</Button>
                <Button onClick={() => reset({ choices: ['90', '60']})}>reset</Button>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );

};