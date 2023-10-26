import { alpha, getContrastRatio } from "@mui/material"

const colorBasePrimary = "#0f6810c9"
const colorMainPrimary = alpha(colorBasePrimary, 0.7)

const colorBaseSecondary = "#e26a1a53"
const colorMainSecondary = alpha(colorBaseSecondary, 0.7)

export const DefaultTheme = {

    palette: {
        primary: {
            main: colorMainPrimary,
            dark: alpha(colorBasePrimary, 0.9),
            light: alpha(colorBasePrimary, 0.5),
            contrastText: getContrastRatio(colorMainPrimary, '#fff') > 4.5 ? '#fff' : '#111',
        },
        secondary: {
            main: colorMainSecondary,
            dark: alpha(colorBaseSecondary, 0.9),
            light: alpha(colorBaseSecondary, 0.5),
            contrastText: getContrastRatio(colorMainSecondary, '#fff') > 4.5 ? '#fff' : '#111',
        },
        background: {
            paper: '#ffffff',
            default: '#0e5a82',
        }
    }
}

