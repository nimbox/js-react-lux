import { addDecorator } from '@storybook/react';
import React from 'react';

addDecorator(
    (story) => <div className="p-16 bg-gray-100"><div className="bg-white">{story()}</div></div>
);
