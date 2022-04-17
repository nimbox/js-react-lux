const {
    relative
} = require('path');

const fieldVerticalPadding = 1.5;
const fieldHorizontalPadding = 0.75;
const fieldLabelScale = 0.75;

module.exports = ({
    theme
}) => {

    console.log('colors', theme('colors'));

    const controls = {

        '.lux-control-font': {
            fontSize: '1em !important',
            lineHeight: '1.15em !important'
        },

        '.lux-control-padding': {
            padding: '0.35em 0.75em'
        },

        // Field Container

        '.lux-field': {

            display: 'inline-block',
            position: 'relative',

            '.lux-field-label': {

                position: 'absolute',
                left: 0,
                top: 0,

                color: theme('colors.control-placeholder'),

                pointerEvents: 'none'

            },

            // When in `shrink` state, the label is posisitioned against the 
            // `lux-field`. When is not in `shrink` state, the label is positioned
            // against the `lux-field-content-main`.

            '.lux-field-content-main': {
                position: 'relative'
            },

            '&.lux-field-shrink': {

                '.lux-field-label': {
                    color: theme('colors.control-border'),
                },

                '.lux-field-content-main': {
                    position: 'static'
                }

            },

            '.lux-field-content': {

                display: 'inline-flex',
                alignItems: 'baseline',

                width: '100%',

                transition: 'background-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms',

                '.lux-field-content-start': {

                    display: 'flex',
                    alignItems: 'center',

                    height: '1em',
                    marginRight: `${fieldHorizontalPadding / 2}em`,

                    flex: 'none',
                    alignSelf: 'center',

                },

                '.lux-field-content-main': {

                    minWidth: 0,
                    flex: '1 1 auto',

                },

                '.lux-field-content-end': {

                    display: 'flex',
                    alignItems: 'center',

                    height: '1em',
                    marginLeft: `${fieldHorizontalPadding / 2}em`,

                    flex: 'none',
                    alignSelf: 'center'

                },

                '.lux-field-border': {

                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,

                    pointerEvents: 'none',

                    transition: 'border 200ms cubic-bezier(0, 0, 0.2, 1) 0ms'

                }

            },

            '&.lux-field-outlined': {

                '.lux-field-label': {},

                '.lux-field-content': {

                    padding: `${fieldVerticalPadding / 2}em ${fieldHorizontalPadding}em ${fieldVerticalPadding / 2}em ${fieldHorizontalPadding}em`,

                },

                '.lux-field-border': {

                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme('colors.control-border'),
                    borderRadius: theme('borderRadius.DEFAULT'),

                    'legend': {

                        display: 'none'

                    }

                },

                '&.lux-field-shrink': {

                    '.lux-field-label': {
                        left: `${fieldHorizontalPadding / fieldLabelScale}em`,
                        top: 0,
                        fontSize: `${fieldLabelScale}em`,
                        lineHeight: 0,
                    },

                    '.lux-field-border': {

                        'legend': {

                            display: 'inherit',

                            marginLeft: '0.5em',
                            padding: '0 0.25em',
                            lineHeight: 0,

                            '& > span': {
                                visibility: 'hidden',
                                fontSize: `${fieldLabelScale}em`,
                            }

                        }

                    }

                },


            },

            '&.lux-field-filled': {

                '.lux-field-label': {

                    top: `${ -fieldVerticalPadding * 3 / 10}em`,

                },

                '.lux-field-content': {

                    padding: `${fieldVerticalPadding / 2}em ${fieldHorizontalPadding}em ${fieldVerticalPadding / 2}em ${fieldHorizontalPadding}em`,

                    backgroundColor: theme('colors.control-fill'),
                    borderRadius: theme('borderRadius.DEFAULT'),

                },

                '&.lux-field-has-label': {

                    '.lux-field-content': {

                        padding: `${fieldVerticalPadding * 8 / 10}em ${fieldHorizontalPadding}em ${fieldVerticalPadding * 2 / 10}em ${fieldHorizontalPadding}em`,

                        '.lux-field-content-start': {
                            transform: `translateY(-${fieldVerticalPadding * 3 / 10}em)`
                        },

                        '.lux-field-content-end': {
                            transform: `translateY(-${fieldVerticalPadding * 3 / 10}em)`
                        }

                    }
                },

                '.lux-field-border': {

                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme('colors.control-border'),
                    borderRadius: theme('borderRadius.DEFAULT'),

                },

                '&.lux-field-shrink': {

                    '.lux-field-label': {
                        left: `${fieldHorizontalPadding / fieldLabelScale}em`,
                        top: `${ fieldVerticalPadding * 6 / 10}em`,
                        fontSize: `${fieldLabelScale}em`,
                        lineHeight: 0,
                    },

                },

                '&.lux-field-has-focus.lux-field-has-start,&.lux-field-has-value.lux-field-has-start': {

                    '.lux-field-content': {
                        '.lux-field-content-start': {
                            transform: 'none'
                        }
                    }

                }

            },

            '&.lux-field-inlined': {

                '.lux-field-label': {},

                '.lux-field-content': {

                    padding: `${fieldVerticalPadding * 2 / 10}em 0 ${fieldVerticalPadding * 0 / 10}em 0`,

                },

                '.lux-field-border': {

                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme('colors.control-border'),

                },

                '&.lux-field-shrink': {

                    '.lux-field-label': {
                        left: 0,
                        top: 0,
                        fontSize: `${fieldLabelScale}em`,
                        lineHeight: 0
                    }

                },


            },

            '&:hover': {

                '&.lux-field-outlined': {
                    '.lux-field-border': {
                        borderWidth: 2,
                    }
                },

                '&.lux-field-filled': {
                    '.lux-field-content': {
                        backgroundColor: theme('colors.control-fill-hover'),
                    },
                    '.lux-field-border': {
                        borderBottomWidth: 2,
                    }
                },

                '&.lux-field-inlined': {
                    '.lux-field-border': {
                        borderBottomWidth: 2,
                    }
                },

                '.lux-field-border': {
                    borderColor: theme('colors.control-border-hover')
                }

            },

            '&:focus-within, &.lux-field-has-focus': {

                '.lux-field-label': {
                    color: theme('colors.primary.500')
                },

                '.lux-field-border': {
                    borderColor: theme('colors.primary.500')
                },

                '&.lux-field-outlined': {
                    '.lux-field-border': {
                        borderWidth: 2,
                    }
                },

                '&.lux-field-filled': {
                    '.lux-field-border': {
                        borderBottomWidth: 2,
                    }
                },

                '&.lux-field-inlined': {
                    '.lux-field-border': {
                        borderBottomWidth: 2,
                    }
                }

            },

            '&.lux-field-has-disabled': {

                '.lux-field-label': {
                    color: theme('colors.control-border-disabled')
                },


                '&.lux-field-filled': {
                    '.lux-field-content': {
                        backgroundColor: theme('colors.control-fill-disabled'),
                    }
                },

                '.lux-field-border': {
                    borderStyle: 'dashed',
                    borderColor: theme('colors.control-border-disabled')
                },

            },

            '&.lux-field-has-error': {

                '.lux-field-label': {
                    color: theme('colors.danger.500')
                },


                '.lux-field-border': {
                    borderColor: theme('colors.danger.500')
                },

            }

        }

    };

    return controls;

};