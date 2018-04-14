import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ScrollView, View} from 'react-native';

import Box from './Box'
import {withTheme} from '../theme'

class Paper extends React.Component {
    render() {

        const {children, style, theme} = this.props

        const _styles = []
        const dynamicStyles = getDynamicStyles(theme)

        _styles.push(styles.root)
        _styles.push(dynamicStyles.root)
        _styles.push(style)


        return (
            <Box style={_styles} column>
                {children}
            </Box>
        );
    }
}

Paper.propTypes = {
    children: PropTypes.any,
    style: PropTypes.any,
}

const styles = StyleSheet.create({
    root: {
        position: 'relative',
    }
});

const getDynamicStyles = theme => StyleSheet.create({
    root: {
        borderRadius: theme.paper.borderRadius,
        padding: theme.paper.padding,
        backgroundColor: theme.paper.backgroundColor,
        borderBottomColor: theme.paper.borderBottomColor,
        borderBottomWidth: theme.paper.borderBottomWidth,
        borderLeftColor: theme.paper.borderLeftColor,
        borderLeftWidth: theme.paper.borderLeftWidth,
        borderRightColor: theme.paper.borderRightColor,
        borderRightWidth: theme.paper.borderRightWidth,
    }
})

export default withTheme(Paper)