module.exports = {

    '.popper-element': {

        // 'color': 'white',
        // 'background-color': '#232323',

        '.popper-arrow': {

            'position': 'absolute',
            'width': '1rem',
            'height': '1rem',

            '&::before': {
                'content': '""',
                'margin': 'auto',
                'display': 'block',
                'position': 'absolute',
                'width': 0,
                'height': 0,
                'border-style': 'solid',
            },

            '&::after': {
                'content': '""',
                'margin': 'auto',
                'display': 'block',
                'position': 'absolute',
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
                    'top': 0,
                    'right': 0,
                    'margin-right': '0.25em',
                    'border-width': '0.5em 0 0.5em 0.5em',
                    'border-color': 'transparent transparent transparent #888888'
                },
                '&::after': {
                    'top': 0,
                    'right': 0,
                    'margin-right': 'calc(0.25em + 1px)',
                    'border-width': '0.5em 0 0.5em 0.5em',
                    'border-color': 'transparent transparent transparent white'
                }
            }
        },

        '&[data-popper-placement*="top"]': {
            '.popper-arrow': {
                'bottom': 0,
                'left': 0,
                'margin-bottom': '-1em',
                '&::before': {
                    'bottom': 0,
                    'margin-bottom': '0.5em',
                    'border-width': '0.5em 0.5em 0 0.5em',
                    'border-color': '#888888 transparent transparent transparent'
                },
                '&::after': {
                    'bottom': 0,
                    'margin-bottom': 'calc(0.5em + 1px)',
                    'border-width': '0.5em 0.5em 0 0.5em',
                    'border-color': 'white transparent transparent transparent'
                }
            }
        },

        '&[data-popper-placement*="right"]': {
            '.popper-arrow': {
                'left': 0,
                'margin-left': '-0.75em',
                '&::before': {
                    'top': 0,
                    'left': 0,
                    'margin-left': '0.25em',
                    'border-width': '0.5em 0.5em 0.5em 0',
                    'border-color': 'transparent #888888 transparent transparent'
                },
                '&::after': {
                    'top': 0,
                    'left': 0,
                    'margin-left': 'calc(0.25em + 1px)',
                    'border-width': '0.5em 0.5em 0.5em 0',
                    'border-color': 'transparent white transparent transparent'
                }
            }
        },

        '&[data-popper-placement*="bottom"]': {
            '.popper-arrow': {
                'top': 0,
                'left': 0,
                'margin-top': '-0.5em',
                '&::before': {
                    'top': 0,
                    'margin-top': 0,
                    'border-width': '0 0.5em 0.5em 0.5em',
                    'border-color': 'transparent transparent #888888 transparent'
                },
                '&::after': {
                    'top': 0,
                    'margin-top': '1px',
                    'border-width': '0 0.5em 0.5em 0.5em',
                    'border-color': 'transparent transparent white transparent'
                }
            }
        }

    }

};
