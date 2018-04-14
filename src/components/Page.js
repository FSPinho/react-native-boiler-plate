import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ScrollView, View} from 'react-native';

import Box from './Box'
import {withTheme} from '../theme'

class Page extends React.Component {
    render() {

        const {
            children,
            style,
            noBackground,
            onScroll,
            theme,
        } = this.props

        const _styles = []

        if (noBackground) {
            _styles.push(styles.noBackground)
        } else {
            _styles.push({backgroundColor: theme.palette.pageBackgroundColor})
        }

        _styles.push(styles.root)
        _styles.push(style)


        return (
            <Box fitAbsolute style={_styles}>
                <ScrollView onScroll={onScroll}>
                    <View>
                        {children}
                    </View>
                </ScrollView>
            </Box>
        );
    }
}

Page.propTypes = {
    noBackground: PropTypes.bool,
    onScroll: PropTypes.func,

    children: PropTypes.any,
    style: PropTypes.any,
}

const styles = StyleSheet.create({
    root: { },
    noBackground: {
        backgroundColor: 'transparent'
    }
});

export default withTheme(Page)