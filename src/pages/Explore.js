import React from 'react'
import {Animated, Dimensions, StyleSheet, Text} from 'react-native'
import BottomNavigation, {Tab} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {Box, ListOfSites, Page, Paper} from '../components'
import {withTheme} from '../theme'


const DEF_INFO_CARD_SCALE_GAP = 16
const DEF_INFO_CARD_SCALE_GAP_EXPANDED = 0
const DEF_INFO_CARD_ANIMATION_DURATION = 200


const Tabs = withTheme(({theme, activeTab, onTabChange}) => {

    const navTheme = theme.bottomNavigation

    const tabOptions = {
        labelColor: navTheme.inactiveColor,
        activeLabelColor: navTheme.activeColor,
    }

    return (
        <BottomNavigation
            backgroundColor={navTheme.backgroundColor}
            rippleColor={navTheme.rippleColor}
            activeTab={activeTab}
            style={{
                height: 56,
                elevation: 8,
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0
            }}
            onTabChange={onTabChange}>
            <Tab
                {...tabOptions}
                label="Sites"
                icon={<Icon color={navTheme.inactiveColor} size={24} name="map-marker"/>}
                activeIcon={<Icon color={navTheme.activeColor} size={24} name="map-marker"/>}
            />
            <Tab
                {...tabOptions}
                label="Tours"
                icon={<Icon color={navTheme.inactiveColor} size={24} name="routes"/>}
                activeIcon={<Icon color={navTheme.activeColor} size={24} name="routes"/>}
            />
        </BottomNavigation>
    )
})


class Explore extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            expandedScale: new Animated.Value(this.getInfoCardScaleGap(DEF_INFO_CARD_SCALE_GAP)),
            headerFixed: false,
            activeTab: 0,
        }

        Dimensions.addEventListener('change', () => {
            this.setState({
                expandedScale: new Animated.Value(this.getInfoCardScaleGap(DEF_INFO_CARD_SCALE_GAP))
            })
        })
    }


    /**
     * Returns the correct scale to get the pixel gap given as param
     * */
    getInfoCardScaleGap = () => {
        const gap = (this.state && this.state.expanded) ? DEF_INFO_CARD_SCALE_GAP_EXPANDED : DEF_INFO_CARD_SCALE_GAP
        const scaleGap = 1 - 2 * gap / Dimensions.get('window').width

        return scaleGap
    }

    doChangeExpand = expanded => {
        if (expanded != this.state.expanded) {
            this.setState({
                ...this.state,
                expanded,
            }, () => {
                Animated.timing(
                    this.state.expandedScale, {
                        toValue: this.getInfoCardScaleGap(),
                        duration: DEF_INFO_CARD_ANIMATION_DURATION
                    }).start();
            })
        }
    }

    doChangeHeaderFixed = headerFixed => {
        if (headerFixed != this.state.headerFixed) {
            this.setState({
                ...this.state,
                headerFixed
            })
        }
    }

    handleOnScroll = e => {
        const scrollTop = e.nativeEvent.contentOffset.y
        const {height} = Dimensions.get('window')

        if (scrollTop >= height - 192)
            this.doChangeHeaderFixed(true)
        else
            this.doChangeHeaderFixed(false)

        if (scrollTop >= height / 4)
            this.doChangeExpand(true)
        else
            this.doChangeExpand(false)

    }

    handleTabChanged = activeTab =>
        this.setState({
            ...this.state,
            activeTab
        })

    render() {

        const dynamicStyles = getDynamicStyles(this.props.theme, this.state)

        return (
            <Box fitAbsolute column>

                <Box fitAbsolute style={[styles.map, dynamicStyles.map]} centralize>
                    <Text>Map View</Text>
                </Box>

                <Paper ref="mapInfoHeaderTop" style={[styles.mapInfoHeaderTop, dynamicStyles.mapInfoHeaderTop]}>
                    <Box style={[styles.mapInfoHeader, dynamicStyles.mapInfoHeader]}
                         centralize>

                        <Tabs activeTab={this.state.activeTab}
                              onTabChange={this.handleTabChanged}
                              theme={this.props.theme}/>

                    </Box>
                </Paper>

                <Page noBackground onScroll={this.handleOnScroll}>
                    <Animated.View style={dynamicStyles.mapInfoWrapper}>
                        <Paper column style={[styles.mapInfo, dynamicStyles.mapInfo]}>
                            <Box style={[styles.mapInfoHeader, dynamicStyles.mapInfoHeader]}
                                 centralize>

                                <Tabs activeTab={this.state.activeTab}
                                      onTabChange={this.handleTabChanged}
                                      theme={this.props.theme}/>

                            </Box>
                            <ListOfSites padding/>
                        </Paper>
                    </Animated.View>
                </Page>
            </Box>
        )
    }
}

const styles = StyleSheet.create({
    map: {},
    mapInfo: {
        marginBottom: 0,
    },
    mapInfoHeader: {
        height: 54,
    },
    mapInfoHeaderTop: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
    }
})

const getDynamicStyles = (theme, state) => ({
    map: {
        backgroundColor: theme.page.backgroundColor
    },
    mapInfoWrapper: {
        transform: [{scaleX: state.expandedScale}]
    },
    mapInfo: {
        marginTop: Dimensions.get('window').height - 192,
    },
    mapInfoHeader: {
        backgroundColor: theme.bottomNavigation.backgroundColor
    },
    mapInfoHeaderTop: {
        opacity: state.headerFixed ? 1 : 0
    }
})

export default withTheme(Explore)