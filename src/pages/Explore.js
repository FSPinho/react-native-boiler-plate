import React from 'react';
import {Animated, Dimensions, StyleSheet, Text} from 'react-native';

import {Box, Page, Paper, CustomTabNavigator} from '../components'
import {withTheme} from '../theme'


const DEF_INFO_CARD_MARGIN = 16
const DEF_INFO_CARD_MARGIN_EXPANDED = 0
const DEF_INFO_CARD_ANIM_DURATION = 150


class Explore extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            expandedMargin: new Animated.Value(DEF_INFO_CARD_MARGIN)
        }
    }

    doChangeExpand = expanded => {
        if (expanded != this.state.expanded) {
            this.setState({
                ...this.state,
                expanded,
            })

            if (expanded)
                Animated.timing(
                    this.state.expandedMargin,
                    {toValue: DEF_INFO_CARD_MARGIN_EXPANDED, duration: DEF_INFO_CARD_ANIM_DURATION}
                ).start();
            else
                Animated.timing(this.state.expandedMargin, {
                    toValue: DEF_INFO_CARD_MARGIN,
                    duration: DEF_INFO_CARD_ANIM_DURATION
                }).start();
        }
    }

    handleOnScroll = e => {
        const scrollTop = e.nativeEvent.contentOffset.y
        const {height} = Dimensions.get('window')

        if (scrollTop >= height / 4)
            this.doChangeExpand(true)
        else
            this.doChangeExpand(false)
    }

    render() {

        const dynamicStyles = getDynamicStyles(this.props.theme, this.state)

        return (
            <Box fitAbsolute column>

                <Page>
                    <Text>Map View</Text>
                </Page>

                <Page noBackground onScroll={this.handleOnScroll}>
                    <Animated.View style={dynamicStyles.mapInfoWrapper}>
                        <Paper column style={styles.mapInfo}>
                            <CustomTabNavigator tabs={[
                                {name: 'Sites', icon: 'map-marker', component: Paper},
                                {name: 'Tours', icon: 'routes', component: Paper},
                            ]}/>
                        </Paper>
                    </Animated.View>
                </Page>
            </Box>
        )
    }
}

const styles = StyleSheet.create({
    mapInfo: {
        marginTop: Dimensions.get('window').height - 192,
        marginBottom: 16,
    }
})

const getDynamicStyles = (theme, state) => ({
    mapInfoWrapper: {
        marginLeft: state.expandedMargin,
        marginRight: state.expandedMargin,
    }
})

export default withTheme(Explore)