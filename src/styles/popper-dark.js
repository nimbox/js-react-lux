module.exports = {

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
