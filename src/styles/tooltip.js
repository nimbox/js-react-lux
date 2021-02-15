module.exports = {

    '[data-tooltip]': {

        position: 'relative',
        zIndex: 1,

    },

    '[data-tooltip]:before': {

        content: '""',

        position: 'absolute',
        top: '-0.5rem',
        left: 'calc(50% - 0.25rem)',

        width: 0,
        height: 0,

        borderLeft: '0.25rem solid transparent',
        borderRight: '0.25rem solid transparent',
        borderTop: '0.5rem solid #222222',

        opacity: 0,
        zIndex: 2,
        visibility: 'hidden',

    },

    '[data-tooltip]:after': {

        content: 'attr(data-tooltip)',

        position: 'absolute',
        top: '-2.375rem',
        left: '50%',
        marginTop: '2px',
        marginLeft: '-1rem',

        backgroundColor: '#222222',

        color: '#ffffff',
        padding: '0.125rem 0.5rem',
        fontSize: '0.875rem',
        whiteSpace: 'nowrap',
        boxShadow: '1px 1px 3px #222222',

        border: '1px solid #222222',
        borderRadius: '2px',

        opacity: 0,
        zIndex: 1,
        visibility: 'hidden',

    },

    '[data-tooltip]:hover:before': {
        opacity: 1,
        transition: 'all 0.1s ease 0.5s',
        visibility: 'visible',
    },

    '[data-tooltip]:hover:after': {
        opacity: 1,
        transition: 'all 0.1s ease 0.5s',
        visibility: 'visible',
    },

    '[data-tooltip][data-tooltip-show]:before': {
        opacity: 1,
        visibility: 'visible',
    },

    '[data-tooltip][data-tooltip-show]:after': {
        opacity: 1,
        visibility: 'visible',
    },

    'svg g.has-svg-tooltip:hover .svg-tooltip': {
        display: 'inherit',
    },

    'svg .svg-tooltip': {
        display: 'none',
        overflow: 'visible',
    },

    'svg .svg-tooltip body': {
        position: 'fixed',
    }

};
