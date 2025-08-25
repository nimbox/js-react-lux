export default {

    '.tooltip-element': {

        padding: '0.125em 0.5em',

        color: '#ffffff',
        backgroundColor: '#222222',

        boxShadow: '1px 1px 3px #222222',
        borderRadius: '4px',

        '.tooltip-arrow': {
            fill: '#222222',
            '& > path:last-of-type': {
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.3))'
            }
        }

    }

};
