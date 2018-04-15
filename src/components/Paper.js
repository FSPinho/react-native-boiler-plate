import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ScrollView, View} from 'react-native';

import Box from './Box'
import {withTheme} from '../theme'

class Paper extends React.Component {

    setNativeProps = (nativeProps) => {
        this.refs.root.setNativeProps(nativeProps);
    }

    render() {

        const {padding, children, style, theme} = this.props

        const _styles = []
        const dynamicStyles = getDynamicStyles(theme)

        _styles.push(styles.root)
        _styles.push(dynamicStyles.root)

        if (padding)
            _styles.push(dynamicStyles.padding)

        _styles.push(style)


        return (
            <Box ref="root" style={_styles} column>
                {children}
            </Box>
        );
    }
}

Paper.propTypes = {
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    children: PropTypes.any,
    style: PropTypes.any,
}

const styles = StyleSheet.create({
    root: {
        position: 'relative',
        padding: 0,
    }
});

const getDynamicStyles = theme => StyleSheet.create({
    root: {
        borderRadius: theme.paper.borderRadius,
        backgroundColor: theme.paper.backgroundColor,
        borderBottomColor: theme.paper.borderBottomColor,
        borderBottomWidth: theme.paper.borderBottomWidth,
        borderLeftColor: theme.paper.borderLeftColor,
        borderLeftWidth: theme.paper.borderLeftWidth,
        borderRightColor: theme.paper.borderRightColor,
        borderRightWidth: theme.paper.borderRightWidth,
    },
    padding: {
        padding: theme.paper.padding,
    }
})

export default withTheme(Paper)