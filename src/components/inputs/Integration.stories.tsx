/* eslint-disable import/no-anonymous-default-export */
import { Button } from '../Button';
import { InputField } from './InputField';


// Definition

export default {
    title: 'Component/Controls/Integration',
};

export const Sizes = () => {

    return (
        <div className="flex justify-center items-center">

            <InputField variant="outlined" label="Label" defaultValue="Value" />
            <InputField variant="filled" label="Label" defaultValue="Value" />

            <Button>GO</Button>
            <Button variant="outlined">GO</Button>
            <Button variant="text">GO</Button>

        </div>
    );

};
