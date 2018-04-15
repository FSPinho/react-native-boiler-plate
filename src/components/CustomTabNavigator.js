import React from 'react';
import {NavigationComponent} from 'react-native-material-bottom-navigation'
import {TabNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'

import withTheme from "../theme/withTheme";

class CustomTabNavigator extends React.Component {

    setNativeProps = (nativeProps) => {
        this.refs.navigation.setNativeProps(nativeProps);
    }

    constructor(props) {
        super(props)

        const {theme, tabs, disableAnimations, position, topOffset} = this.props
        const navTheme = theme.bottomNavigation
        const options = {}

        if(disableAnimations) {
            options.swipeEnabled = false
            options.animationEnabled = false
        }

        const tabOptions = {
            labelColor: navTheme.inactiveColor,
            activeLabelColor: navTheme.activeColor,
        }

        const _screens = {}
        const _tabs = {}
        tabs.map(t => _screens[t.name] = {screen: t.component})
        tabs.map(t => _tabs[t.name] = {
            ...tabOptions,
            label: t.name,
            icon: <Icon color={navTheme.inactiveColor} size={24} name={t.icon}/>,
            activeIcon: <Icon color={navTheme.activeColor} size={24} name={t.icon}/>
        })

        const Navigator = TabNavigator(
            _screens,
            {
                tabBarComponent: NavigationComponent,
                tabBarPosition: position,
                tabBarOptions: {
                    bottomNavigationOptions: {
                        style: {
                            top: topOffset,
                            zIndex: 10
                        },
                        backgroundColor: navTheme.backgroundColor,
                        rippleColor: navTheme.rippleColor,
                        tabs: _tabs,
                    }
                },
                ...options
            }
        )

        this.state = {
            navigator: <Navigator/>,
        }
    }

    render() {
        const {navigator} = this.state
        return navigator
    }
}

CustomTabNavigator.defaultProps = {
    tabs: [],
    position: 'bottom',
    disableAnimations: false,
    topOffset: 0
}

CustomTabNavigator.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string,
        component: PropTypes.any.isRequired,
    })).isRequired,

    position: PropTypes.oneOf(['top', 'bottom']),
    topOffset: PropTypes.number,
    disableAnimations: PropTypes.bool,
}

export default withTheme(CustomTabNavigator)