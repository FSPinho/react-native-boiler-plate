import Color from 'react-native-material-color'

const palette = {
    primary: Color.DeepPruple,
    accent: Color.PINK['A200'],
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
    },

    page: {
        backgroundColor: Color.INDIGO['50']
    },

    list: {
        backgroundColor: Color.INDIGO['50'],
        padding: 16,
        borderRadius: 4,
    }
}

export default theme