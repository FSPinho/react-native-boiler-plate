import Color from 'react-native-material-color'

const palette = {
    primary: Color.DeepPruple,
    accent: Color.PINK['A200'],

    pageBackgroundColor: Color.INDIGO['50']
}

const theme = {
    palette,

    paper: {
        borderRadius: 4,
        padding: 16,
        backgroundColor: Color.White,
        borderBottomColor: `rgba(0, 0, 0, .12)`,
        borderBottomWidth: 1,
        borderLeftColor: `rgba(0, 0, 0, .06)`,
        borderLeftWidth: 1,
        borderRightColor: `rgba(0, 0, 0, .06)`,
        borderRightWidth: 1,
    },

    bottomNavigation: {
        backgroundColor: Color.White,
        activeColor: palette.primary,
        rippleColor: palette.primary,
        inactiveColor: Color.BLUEGREY['300'],
    }
}

export default theme