import React from 'react'
import { Animated, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'
import MapView from 'react-native-maps'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { TouchableView, Box } from '../components'
import { withTheme } from '../theme'


const DEF_INFO_PREV_HEIGHT = 56 * 2


class Explore extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    getInfoCardScaleGap = (gap) => {
        const scaleGap = 2 * gap / Dimensions.get('window').width

        return scaleGap
    }

    componentDidMount = () => {
        this.refs.info.setNativeProps({
            top: Dimensions.get('window').height - DEF_INFO_PREV_HEIGHT - 56 - getStatusBarHeight(),
            transform: [{scaleX: 1 - this.getInfoCardScaleGap(16)}]
        })
    }

    setInfoTopPosition = top => {
        const info = this.refs.info
        const infoHeader = this.refs.infoHeader
        const contentHeight = Dimensions.get('window').height - 56 - getStatusBarHeight()
        const scaleStep = Math.min(1.0, Math.max(0, top / (contentHeight - DEF_INFO_PREV_HEIGHT)))
        const scaleGap = 1 - this.getInfoCardScaleGap(16) * scaleStep

        info.setNativeProps({
            top,
            transform: [{scaleX: scaleGap}]
        })

        infoHeader.setNativeProps({
            top: Math.max(0, -top),
            elevation: 2 * parseInt(scaleGap)
        })
    }

    moveInfoToTop = () => {
        const root = this.refs.root
        const info = this.refs.info

        info.measure(root, (_, y) => {
            
            const defTop = Dimensions.get('window').height - DEF_INFO_PREV_HEIGHT - 56 - getStatusBarHeight()
            const toTop = y >= defTop - 5
            const toBottom = y <= 5
            if(toTop || toBottom) {

                const v = new Animated.Value(y)

                v.addListener(({value}) => {
                    this.setInfoTopPosition(value)
                })

                this.currentInfoAnimation = Animated.timing(v, {
                    toValue: toBottom ? defTop : 0,
                    duration: 200,
                })

                this.currentInfoAnimation.start();
            }
        })
    }

    handleInfoTouch = ({yOffset}) => {
        const root = this.refs.root
        const info = this.refs.info

        if(this.currentInfoAnimation) {
            console.log("Stoping animation")
            this.currentInfoAnimation.stop()
        }

        if(root && info) {
            info.measure(root, (_, y, __, h) => {
                const contentHeight = Dimensions.get('window').height - 56 - getStatusBarHeight()
                const infoInitialTop = contentHeight - DEF_INFO_PREV_HEIGHT
                const top = Math.max(Math.min(infoInitialTop, y + yOffset), -(h - contentHeight))

                this.setInfoTopPosition(top)
            })
        }
    }

    handleInfoHeaderTouch = () => {
        console.log("Header touch")
        this.moveInfoToTop()
    }

    render() {

        const { theme } = this.props
        const dynamicStyles = getDynamicStyles(theme, this.sate)

        return (
            <View ref="root" style={styles.root}>

                <TouchableView style={[styles.content, dynamicStyles.content]} tag="content">
                    <MapView style={styles.map}/>
                </TouchableView>
                <TouchableView onTouch={this.handleInfoTouch} style={[styles.info, dynamicStyles.info]} ref="info" tag="info">
                    <TouchableView onOneTouch={this.handleInfoHeaderTouch} style={[styles.infoHeader, dynamicStyles.infoHeader]} tag="headerInfo" ref="infoHeader">
                        <Box centralize fitAbsolute>
                            <Text>Info Header</Text>
                        </Box> 
                    </TouchableView>
                    
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    <Text>Info Content</Text>
                    
                </TouchableView>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    info: {
        ...StyleSheet.absoluteFillObject,
        bottom: 'auto',
        padding: 16,
        paddingTop: 56 + 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
})

const getDynamicStyles = (theme, state) => ({
    content: {
        backgroundColor: theme.explore.content.backgroundColor,
    },
    info: {
        borderTopLeftRadius: theme.explore.info.borderRadius,
        borderTopRightRadius: theme.explore.info.borderRadius,
        overflow: 'hidden',

        backgroundColor: theme.explore.info.backgroundColor,
        borderRadius: theme.explore.info.borderRadius,
        backgroundColor: theme.explore.info.backgroundColor,
        borderLeftColor: theme.explore.info.borderLeftColor,
        borderLeftWidth: theme.explore.info.borderLeftWidth,
        borderRightColor: theme.explore.info.borderRightColor,
        borderRightWidth: theme.explore.info.borderRightWidth,
    },
    infoHeader: {
        ...StyleSheet.absoluteFillObject,
        bottom: 'auto',
        height: 56,
        backgroundColor: theme.explore.info.headerBackgroundColor,
        zIndex: 10,

        borderBottomColor: theme.explore.info.borderBottomColor,
        borderBottomWidth: theme.explore.info.borderBottomWidth,
    },
})

export default withTheme(Explore)