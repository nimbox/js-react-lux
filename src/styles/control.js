const fieldVerticalPadding = 1.5; // For top and bottom.
const fieldHorizontalPadding = 1.5; // For left and right.
const fieldLabelScale = 0.75;
const fieldLabelHorizontalPadding = 0.25; // For left and right.

export default ({ theme }) => {

    const controls = {

        '.lux-control-font': {
            fontSize: '1em !important',
            lineHeight: '1.15em !important'
        },

        '.lux-control-padding': {
            padding: '0.35em 0.75em'
        },

        // Crux Container

        '.lux-crux': {

            display: 'inline-flex',
            alignItems: 'baseline',

            minWidth: 0,
            maxWidth: '100%',

            '.lux-crux-start': {

                flex: 'none',
                alignSelf: 'center',

                display: 'flex',
                alignItems: 'center',

                height: 0,
                marginRight: `${fieldHorizontalPadding / 4}em`,

                fill: 'current-color'

            },

            '.lux-crux-content': {

                flex: '1 1 0%',

                display: 'inline-flex',
                alignItems: 'baseline',

                minWidth: 0,
                maxWidth: '100%',

            },

            '.lux-crux-end': {

                flex: 'none',
                alignSelf: 'center',

                display: 'flex',
                alignItems: 'center',

                height: 0,
                marginLeft: `${fieldHorizontalPadding / 4}em`,

                fill: 'current-color'

            },

            '&.lux-crux-empty': {

                '.lux-crux-start': {
                    marginRight: 0
                },

                '.lux-crux-end': {
                    marginLeft: 0
                }

            },


        },

        // Button Container

        '.lux-button': {

            '&.lux-button-filled': {

                padding: `${fieldVerticalPadding / 2}em ${fieldHorizontalPadding / 2}em ${fieldVerticalPadding / 2}em ${fieldHorizontalPadding / 2}em`,

                backgroundColor: theme('colors.primary.500'),

                // borderWidth: '1px',
                borderRadius: theme('borderRadius.DEFAULT'),

                '&.lux-button-primary': {
                    color: 'white',
                    backgroundColor: theme('colors.primary.500'),
                    '&:hover': {
                        color: 'white',
                        backgroundColor: theme('colors.primary.600'),
                    }
                },

                '&.lux-button-secondary': {
                    color: 'white',
                    backgroundColor: theme('colors.secondary.500'),
                    '&:hover': {
                        color: 'white',
                        backgroundColor: theme('colors.secondary.600'),
                    }
                },

                '&.lux-button-muted': {
                    color: 'white',
                    backgroundColor: theme('colors.gray.300'),
                    '&:hover': {
                        color: 'white',
                        backgroundColor: theme('colors.gray.400'),
                    }
                },

                '&.lux-button-danger': {
                    color: 'white',
                    backgroundColor: theme('colors.danger.500'),
                    '&:hover': {
                        color: 'white',
                        backgroundColor: theme('colors.danger.600'),
                    }
                }

            },

            '&.lux-button-outlined': {

                padding: `calc(${fieldVerticalPadding / 2}em - 1px) calc(${fieldHorizontalPadding / 2}em - 1px) calc(${fieldVerticalPadding / 2}em - 1px) calc(${fieldHorizontalPadding / 2}em - 1px)`,

                borderWidth: '1px',
                borderRadius: theme('borderRadius.DEFAULT'),

                '&.lux-button-primary': {
                    color: theme('colors.primary.500'),
                    borderColor: theme('colors.primary.500'),
                    '&:hover': {
                        backgroundColor: theme('colors.primary.100'),
                    }
                },

                '&.lux-button-secondary': {
                    color: theme('colors.secondary.500'),
                    borderColor: theme('colors.secondary.500'),
                    '&:hover': {
                        backgroundColor: theme('colors.secondary.100'),
                    }
                },

                '&.lux-button-muted': {
                    color: theme('colors.gray.500'),
                    borderColor: theme('colors.gray.300'),
                    '&:hover': {
                        backgroundColor: theme('colors.gray.100'),
                    }
                },

                '&.lux-button-danger': {
                    color: theme('colors.danger.500'),
                    borderColor: theme('colors.danger.500'),
                    '&:hover': {
                        backgroundColor: theme('colors.danger.100'),
                    }
                }

            },

            '&.lux-button-text': {

                padding: `${fieldVerticalPadding / 2}em ${fieldHorizontalPadding / 2}em ${fieldVerticalPadding / 2}em ${fieldHorizontalPadding / 2}em`,

                borderRadius: theme('borderRadius.DEFAULT'),

                '&.lux-button-primary': {
                    '&:hover': {
                        backgroundColor: theme('colors.primary.100'),
                    }
                },

                '&.lux-button-secondary': {
                    '&:hover': {
                        backgroundColor: theme('colors.secondary.100'),
                    }
                },

                '&.lux-button-muted': {
                    '&:hover': {
                        backgroundColor: theme('colors.gray.100'),
                    }
                },

                '&.lux-button-danger': {
                    '&:hover': {
                        backgroundColor: theme('colors.danger.100'),
                    }
                }


            },

            '&.lux-button-link': {

                textDecorationLine: 'underline'

            },

            // Colors for the different semantinc states

            '&.lux-button-primary': {
                color: theme('colors.primary.500'),
                borderColor: theme('colors.primary.500'),
                '&:hover': {
                    color: theme('colors.primary.600'),
                    borderColor: theme('colors.primary.600'),
                }
            },

            '&.lux-button-secondary': {
                color: theme('colors.secondary.500'),
                borderColor: theme('colors.secondary.500'),
                '&:hover': {
                    color: theme('colors.secondary.600'),
                    borderColor: theme('colors.secondary.600'),
                }
            },

            '&.lux-button-muted': {
                color: theme('colors.gray.400'),
                borderColor: theme('colors.gray.300'),
                '&:hover': {
                    color: theme('colors.gray.500'),
                    borderColor: theme('colors.gray.400'),
                },
            },

            '&.lux-button-danger': {
                color: theme('colors.danger.500'),
                borderColor: theme('colors.danger.500'),
                '&:hover': {
                    color: theme('colors.danger.600'),
                    borderColor: theme('colors.danger.600'),
                }
            },

            '.lux-crux-content': {
                // justifyContent: 'center',
                // alignSelf: 'center'
            },

            // Centered content

            '&.lux-button-centered': {

                '.lux-crux-content': {
                    justifyContent: 'center',
                    alignSelf: 'center'
                }

            },

            // When disabled the button is not clickable

            '&:disabled': {
                opacity: 0.3,
                pointerEvents: 'none',
                cursor: 'not-allowed'
            },

        },

        // Field Container

        '.lux-field': {

            position: 'relative',

            '.lux-field-label': {

                position: 'absolute',
                left: 0,
                top: 0,

                // overflow: 'hidden',
                // textOverflow: 'ellipsis',
                // whiteSpace: 'nowrap',

                color: theme('colors.control-placeholder'),

                pointerEvents: 'none'

            },

            // When in `shrink` state, the label is posisitioned against the
            // `lux-field`. When is not in `shrink` state, the label is
            // positioned against the `lux-field-content`.

            '&:focus-within, &.lux-field-shrink': {

                '.lux-field-label': {
                    color: theme('colors.control-border'),
                },

                '.lux-field-content': {
                    position: 'static'
                }

            },

            '.lux-field-start': {
                color: theme('colors.control-border')
            },

            '.lux-field-content': {
                position: 'relative',
                width: '100%'
            },

            '.lux-field-end': {
                color: theme('colors.control-border')
            },


            '.lux-field-border': {

                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,

                pointerEvents: 'none'

            },


            '&.lux-field-outlined': {

                padding: `${fieldVerticalPadding / 2}em ${fieldHorizontalPadding / 2}em ${fieldVerticalPadding / 2}em ${fieldHorizontalPadding / 2}em`,

                '.lux-field-border': {

                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme('colors.control-border'),
                    borderRadius: theme('borderRadius.DEFAULT'),

                    'legend': {
                        display: 'none'
                    }

                },

                '&:focus-within, &.lux-field-shrink': {

                    '.lux-field-label': {

                        left: `${(fieldHorizontalPadding / 2) / fieldLabelScale}em`,
                        top: 0,

                        fontSize: `${fieldLabelScale}em`,
                        lineHeight: 0,

                    },

                    '.lux-field-border': {

                        'legend': {

                            display: 'inherit',

                            marginLeft: `${fieldHorizontalPadding / 2 - fieldLabelHorizontalPadding}em`,
                            padding: `0 ${fieldLabelHorizontalPadding}em`,

                            fontSize: `${fieldLabelScale}em`,
                            lineHeight: 0,

                            '& > span': {
                                visibility: 'hidden',
                            }

                        }

                    }

                },


            },

            '&.lux-field-filled': {

                '.lux-field-label': {
                    top: `${-fieldVerticalPadding * 3 / 10}em`,
                },

                padding: `${fieldVerticalPadding / 2}em ${fieldHorizontalPadding / 2}em ${fieldVerticalPadding / 2}em ${fieldHorizontalPadding / 2}em`,
                backgroundColor: theme('colors.control-fill'),
                borderRadius: theme('borderRadius.DEFAULT'),

                '&.lux-field-has-label': {

                    padding: `${fieldVerticalPadding * 8 / 10}em ${fieldHorizontalPadding / 2}em ${fieldVerticalPadding * 2 / 10}em ${fieldHorizontalPadding / 2}em`,

                    '.lux-field-start': {
                        transform: `translateY(-${fieldVerticalPadding * 3 / 10}em)`
                    },

                    '.lux-field-end': {
                        transform: `translateY(-${fieldVerticalPadding * 3 / 10}em)`
                    }

                },

                '.lux-field-border': {

                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme('colors.control-border'),
                    borderRadius: theme('borderRadius.DEFAULT')

                },

                '&:focus-within, &.lux-field-shrink': {

                    '.lux-field-label': {
                        left: `${(fieldHorizontalPadding / 2) / fieldLabelScale}em`,
                        top: `${fieldVerticalPadding * 6 / 10}em`,
                        fontSize: `${fieldLabelScale}em`,
                        lineHeight: 0
                    }

                },

                '&:focus-within.lux-field-has-start, &.lux-field-shrink.lux-field-has-start': {

                    '.lux-field-start': {
                        transform: 'none'
                    }

                }

            },

            '&.lux-field-inlined': {

                padding: `${fieldVerticalPadding * 2 / 10}em 0 ${fieldVerticalPadding * 0 / 10}em 0`,

                '.lux-field-border': {

                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme('colors.control-border')

                },

                '&:focus-within, &.lux-field-shrink': {

                    '.lux-field-label': {
                        left: 0,
                        top: 0,
                        fontSize: `${fieldLabelScale}em`,
                        lineHeight: 0
                    }

                }

            },

            '&.lux-field-editable': {

                padding: `${fieldVerticalPadding * 0 / 10}em 0 ${fieldVerticalPadding * 0 / 10}em 0`,

                '.lux-field-border': {

                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: theme('colors.control-border')

                },

                '&:focus-within, &.lux-field-shrink': {

                    '.lux-field-label': {
                        left: 0,
                        top: 0,
                        fontSize: `${fieldLabelScale}em`,
                        lineHeight: 0
                    }

                }

            },


            '&:hover': {

                '.lux-field-start': {
                    color: theme('colors.control-border-hover')
                },

                '.lux-field-end': {
                    color: theme('colors.control-border-hover')
                },

                '.lux-field-border': {
                    borderColor: theme('colors.control-border-hover')
                },

                '&.lux-field-outlined': {
                    '.lux-field-border': {
                        borderWidth: 1
                    }
                },

                '&.lux-field-filled': {
                    backgroundColor: theme('colors.control-fill-hover'),
                    '.lux-field-border': {
                        borderBottomWidth: 1
                    }
                },

                '&.lux-field-inlined': {
                    '.lux-field-border': {
                        borderBottomWidth: 1
                    }
                },

                '&.lux-field-editable': {
                    '.lux-field-border': {
                        borderBottomWidth: 1
                    }
                }

            },

            '&:focus-within, &.lux-field-focus': {

                '.lux-field-label': {
                    color: theme('colors.primary.500')
                },

                '.lux-field-start': {
                    color: theme('colors.primary.500')
                },

                '.lux-field-end': {
                    color: theme('colors.primary.500')
                },

                '.lux-field-border': {
                    borderColor: theme('colors.primary.500')
                },

                '&.lux-field-outlined': {
                    '.lux-field-border': {
                        borderWidth: 2
                    }
                },

                '&.lux-field-filled': {
                    '.lux-field-border': {
                        borderBottomWidth: 2
                    }
                },

                '&.lux-field-inlined': {
                    '.lux-field-border': {
                        borderBottomWidth: 2
                    }
                },

                '&.lux-field-editable': {
                    '.lux-field-border': {
                        borderBottomWidth: 2
                    }
                }

            },

            '&.lux-field-disabled': {

                '.lux-field-label': {
                    color: theme('colors.control-border-disabled')
                },

                '.lux-field-start': {
                    color: theme('colors.control-border-disabled')
                },

                '.lux-field-end': {
                    color: theme('colors.control-border-disabled')
                },

                '&.lux-field-filled': {
                    backgroundColor: theme('colors.control-fill-disabled')
                },

                '.lux-field-border': {
                    borderColor: theme('colors.control-border-disabled')
                },

                cursor: 'not-allowed'

            },

            '&.lux-field-error': {

                '.lux-field-label': {
                    color: theme('colors.danger.500')
                },

                '.lux-field-start': {
                    color: theme('colors.danger.500')
                },

                '.lux-field-end': {
                    color: theme('colors.danger.500')
                },

                '.lux-field-border': {
                    borderColor: theme('colors.danger.500')
                }

            },

            // When disabled the button is not clickable

            'input:disabled': {
                opacity: 0.3,
                cursor: 'not-allowed'
            }

        }

    };

    return controls;

};