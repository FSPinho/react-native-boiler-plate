import React from 'react';
import PropTypes from 'prop-types';
import ReactNative, { View } from 'react-native';


const DEF_MAX_TOUCH_STACK = 2


class TouchableView extends React.Component {

    constructor(props) {
        super(props)

        this.touches = []
    }

    log = (...args) => {
        const {tag} = this.props
        console.log(`${tag} - `, ...args)
    }

    storeTouch = ev => {
        const {
            locationX,
            locationY,
            pageX,
            pageY,
            timestamp,
        } = ev.nativeEvent
        this.touches = [...this.touches, { pageX, pageY, locationX, locationY, timestamp }].splice(-DEF_MAX_TOUCH_STACK)
    }

    analyseTouches = (isLastOne) => {
        const {touches} = this
        
        if(touches && touches.length >= 1) {
            let speedX = 0.0
            let speedY = 0.0
            let xOffset = touches[touches.length - 1].pageX - touches[0].pageX
            let yOffset = touches[touches.length - 1].pageY - touches[0].pageY
            
            const interval = (touches[touches.length - 1].timestamp - touches[0].timestamp) / 1000.0

            if(touches.length > 1) {
                touches.map((t, i, a) => {
                    if(i > 0) {
                        speedX += t.pageX - a[i - 1].pageX
                        speedY += t.pageY - a[i - 1].pageY
                    }
                })
                speedX /= interval
                speedY /= interval
            }

            this.touchState = {
                speedX,
                speedY,
                xOffset,
                yOffset
            }

            this.applyTouch(isLastOne)
        }
    }

    applyTouch = (isLastOne) => {
        const {onTouch, onOneTouch} = this.props
        
        if(onTouch) {
            onTouch(this.touchState)
        }

        if(onOneTouch && isLastOne && this.touchState.speedY === 0) {
            onOneTouch()
        }
    }

    clearTouches = () => {
        const {onTouchEnd} = this.props
        if(onTouchEnd)
            onTouchEnd(this.touchState)
        this.touches = []
    }

    handleEventStart = ev => {
        this.storeTouch(ev)
        this.analyseTouches()
    }

    handleEventMove = ev => {
        this.storeTouch(ev)
        this.analyseTouches()
    }

    handleEventEnd = ev => {
        this.analyseTouches(true)
        this.clearTouches()
    }

    handleEventCancel = ev => {
        this.analyseTouches()
        this.clearTouches()
    }

    handleEventRequest = ev => {
        return true
    }

    handleEventLost = ev => {
        this.analyseTouches()
        this.clearTouches()
    }

    measure = (refNode, callback) => {
        this.refs.root.measureLayout(ReactNative.findNodeHandle(refNode), callback)
    }

    setNativeProps = props => 
        this.refs.root.setNativeProps(props)

    render() {

        const { onTouch, onTouchEnd, tag, ...externalProps } = this.props

        return (
            <View 
                {...externalProps}
                ref="root"
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
                onResponderGrant={this.handleEventStart}
                onResponderReject={this.handleEventCancel} 
                onResponderMove={this.handleEventMove}
                onResponderRelease={this.handleEventEnd}
                onResponderTerminationRequest={this.handleEventRequest}
                onResponderTerminate={this.handleEventLost}
                />
        )

    }
}

TouchableView.propTypes = {
    tag: PropTypes.string,
    onTouch: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onOneTouch: PropTypes.func,
}

export default TouchableView