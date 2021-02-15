import tailwindcss from 'tailwindcss';

var postit = {

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

var tooltip = {

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

var popper = {

    '.popper-element': {

        'color': 'white',
        'background-color': '#232323',

        '.popper-arrow': {

            'position': 'absolute',
            'width': '1rem',
            'height': '1rem',

            '&::before': {
                'content': '""',
                'margin': 'auto',
                'display': 'block',
                'width': 0,
                'height': 0,
                'border-style': 'solid',
            }

        },

        '&[data-popper-placement*="left"]': {
            '.popper-arrow': {
                'right': 0,
                'margin-right': '-0.75em',
                '&::before': {
                    'border-width': '0.5em 0 0.5em 0.5em',
                    'border-color': 'transparent transparent transparent #232323'
                }
            }
        },

        '&[data-popper-placement*="top"]': {
            '.popper-arrow': {
                'bottom': 0,
                'left': 0,
                'margin-bottom': '-1em',
                '&::before': {
                    'border-width': '0.5em 0.5em 0 0.5em',
                    'border-color': '#232323 transparent transparent transparent'
                }
            }
        },

        '&[data-popper-placement*="right"]': {
            '.popper-arrow': {
                'left': 0,
                'margin-left': '-0.75em',
                '&::before': {
                    'border-width': '0.5em 0.5em 0.5em 0',
                    'border-color': 'transparent #232323 transparent transparent'
                }
            }
        },

        '&[data-popper-placement*="bottom"]': {
            '.popper-arrow': {
                'top': 0,
                'left': 0,
                'margin-top': '-0.5em',
                '&::before': {
                    'border-width': '0 0.5em 0.5em 0.5em',
                    'border-color': 'transparent transparent #232323 transparent'
                }
            }
        }

    }

};

const { defaultTheme } = tailwindcss;
const { plugin } = tailwindcss;


var elegant = {

    theme: {

        extend: {
            colors: {

                transparent: 'transparent',

                black: '#000',
                white: '#fff',

                'navigator': defaultTheme.colors.white,
                'navigator-bg': '#252529',
                'navigator-border': '#5f5f5f',

                'content': '#3e3f42',
                'muted': '#9ea0a5',

                'content-bg': '#fbfbfb',
                'content-fg': defaultTheme.colors.white,
                'content-border': '#eaedf3',

                'primary': {
                    100: '#daedef',
                    200: '#bfe3e8',
                    300: '#9ad2db',
                    400: '#78cadd',
                    500: '#4ec0e0',
                    600: '#309eb7',
                    700: '#277d91',
                    800: '#296872',
                    900: '#03374c'
                },
                'secondary': {
                    100: '#f4e1c1',
                    200: '#f9d6a2',
                    300: '#fcc17a',
                    400: '#ffb54a',
                    500: '#f9a11a',
                    600: '#e28414',
                    700: '#ba650f',
                    800: '#964a05',
                    900: '#6b3203'
                },
                'info': {
                    100: '#e7def9',
                    200: '#decdf9',
                    300: '#d1b0f7',
                    400: '#bf96e0',
                    500: '#ab7cc4',
                    600: '#7e55a5',
                    700: '#55388e',
                    800: '#40187f',
                    900: '#250a59'
                },
                'danger': {
                    100: '#eac3c3',
                    200: '#dd9999',
                    300: '#e0807c',
                    400: '#ea6a59',
                    500: '#f05022',
                    600: '#9e1212',
                    700: '#277d91',
                    800: '#7f201d',
                    900: '#4c0f0f'
                }

            },

            strokeWidth: {
                '3': '3',
                '4': '4'
            },

            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding'
            }

        }

    },

    plugins: [
        plugin(function({ addBase, addComponents, config }) {
            addBase({ 'html': { fontSize: '12px' } });
            addComponents({
                ...postit,
                ...tooltip,
                ...popper
            });
        })
    ],

    variants: {
        fontSize: ['responsive', 'group-hover', 'hover'],
        textColor: ['responsive', 'focus', 'group-hover', 'hover'],
        backgroundColor: ['responsive', 'focus', 'group-hover', 'hover'],
        borderWidth: ['last'],
        margin: ['responsive', 'last']
    }

};
var elegant_1 = elegant.theme;
var elegant_2 = elegant.plugins;
var elegant_3 = elegant.variants;

export default elegant;
export { elegant_2 as plugins, elegant_1 as theme, elegant_3 as variants };
//# sourceMappingURL=elegant.js.map
