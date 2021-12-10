module.exports = {

    '.tooltip-element': {

        position: 'relative',

        padding: '0.125em 0.5em',

        color: '#ffffff',
        backgroundColor: '#222222',

        // fontSize: '0.75rem',
        // lineSpacing: 1,
        // whiteSpace: 'nowrap',

        boxShadow: '1px 1px 3px #222222',

        borderRadius: '4px',

        '.tooltip-arrow': {

            position: 'absolute',
            width: '1em',
            height: '1em',

            '&::before': {
                content: '""',
                margin: 'auto',
                display: 'block',
                osition: 'absolute',
                width: 0,
                height: 0,
                borderStyle: 'solid',
            },

            '&::after': {
                content: '""',
                margin: 'auto',
                display: 'block',
                position: 'absolute',
                width: 0,
                height: 0,
                borderStyle: 'solid',
            },

        },

        '&[data-popper-placement*="left"]': {
            '.tooltip-arrow': {
                right: 0,
                marginRight: '-0.75em',
                '&::before': {
                    top: 0,
                    right: 0,
                    marginRight: '0.25em',
                    borderWidth: '0.5em 0 0.5em 0.5em',
                    borderColor: `transparent transparent transparent #222222`
                }
            }
        },

        '&[data-popper-placement*="top"]': {
            '.tooltip-arrow': {
                bottom: 0,
                left: 0,
                marginBottom: '-1em',
                '&::before': {
                    bottom: 0,
                    marginBottom: '0.5em',
                    borderWidth: '0.5em 0.5em 0 0.5em',
                    borderColor: `#222222 transparent transparent transparent`
                }
            }
        },

        '&[data-popper-placement*="right"]': {
            '.tooltip-arrow': {
                left: 0,
                marginLeft: '-0.75em',
                '&::before': {
                    top: 0,
                    left: 0,
                    marginLeft: '0.25em',
                    borderWidth: '0.5em 0.5em 0.5em 0',
                    borderColor: `transparent #222222 transparent transparent`
                }
            }
        },

        '&[data-popper-placement*="bottom"]': {
            '.tooltip-arrow': {
                top: 0,
                left: 0,
                marginTop: '-0.5em',
                '&::before': {
                    top: 0,
                    marginTop: 0,
                    borderWidth: '0 0.5em 0.5em 0.5em',
                    borderColor: `transparent transparent #222222 transparent`
                }
            }
        },

        opacity: 0,

        '&.tooltip-visible': {
            opacity: 1,
            transition: 'opacity 0.1s ease 0.5s',
        }

    }

};