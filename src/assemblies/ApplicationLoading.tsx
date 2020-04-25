import React, { FC } from 'react';
import { Delay } from '../components/Delay';
import { Loading } from '../components/Loading';


//
// ApplicationLoading
//

export const ApplicationLoading: FC<{}> = ({ }) => (
    <Delay delay={500}>
        <div className="h-screen flex flex-row justify-center items-center">
            <div className="inline-block text-center" >
                <p><Loading className="h-20" /></p>
                <p>Loading...</p>
            </div>
        </div>
    </Delay>
);
