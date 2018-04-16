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
            onScrollEnd,
            scrollEnabled,
            theme,
            ...anotherProps
        } = this.props

        const _styles = []

        if (noBackground) {
            _styles.push(styles.noBackground)
        } else {
            _styles.push({backgroundColor: theme.page.backgroundColor})
        }

        _styles.push(styles.root)
        _styles.push(style)

        return (
            <Box fitAbsolute style={_styles} pointerEvents="none">
                <ScrollView onScroll={onScroll}
                            scrollEnabled={scrollEnabled}
                            onScrollEndDrag={onScrollEnd}
                            pointerEvents="none">
                    <View pointerEvents="none">
                        {children}
                    </View>
                </ScrollView>
            </Box>
        );
    }
}

Page.defaultProps = {
    noBackground: false,
    onScroll: () => {},
    onScrollEnd: () => {},
    scrollEnabled: true,
}

Page.propTypes = {
    noBackground: PropTypes.bool,
    onScroll: PropTypes.func,
    onScrollEnd: PropTypes.func,
    scrollEnabled: PropTypes.bool,

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