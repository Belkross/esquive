export function createMuiComponents(theme) {
    return {
        components: {
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundImage: "none",
                        backgroundColor: theme.palette.background.paper,
                        height: "unset", //the paper container is full height by default
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        borderRadius: theme.shape.borderRadius,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: theme.palette.primary.main,
                        backgroundColor: theme.palette.primary.main,
                        boxShadow: theme.shadows[2],
                        "&:disabled": {
                            backgroundColor: theme.palette.action.disabledBackground,
                            borderColor: theme.palette.action.disabledBackground,
                        },
                    },
                },
            },
            MuiButton: {
                defaultProps: {
                    variant: "outlined",
                },
                variants: [
                    {
                        props: { variant: "outlined" },
                        style: {
                            backgroundColor: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
                            boxShadow: theme.shadows[2],
                        },
                    },
                ],
                styleOverrides: {
                    root: {
                        padding: "12px 12px",
                        color: theme.palette.text.primary,
                        width: "max-content",
                        height: "max-content",
                        "&:disabled": {
                            backgroundColor: theme.palette.action.disabledBackground,
                            borderColor: theme.palette.action.disabled,
                        },
                    },
                },
            },
        },
    };
}