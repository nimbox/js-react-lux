module.exports = {

    '.postit-container': {
        position: 'relative',
        zIndex: 1
    },

    '.postit': {

        display: 'inline-block',
        position: 'relative',

        width: '100%',
        minWidth: '64px',
        minHeight: '5rem',

        padding: '1rem',

        border: '1px solid #e8e8e8',
        borderBottomRightRadius: '64px 5px',

        background: '#ffff88'

    },

    '.postit:after': {

        content: '""',

        position: 'absolute',
        right: '0px',
        bottom: '14px',

        width: '48px',
        height: '25px',

        background: 'rgba(0, 0, 0, 0.2)',
        boxShadow: '2px 15px 5px rgba(0, 0, 0, 0.40)',
        transform: 'matrix(-1, -0.1, 0, 1, 0, 0)',

        zIndex: -1

    }

};
