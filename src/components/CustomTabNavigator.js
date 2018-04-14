import React from 'react';
import {NavigationComponent} from 'react-native-material-bottom-navigation'
import {TabNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PropTypes from 'prop-types'

import withTheme from "../theme/withTheme";

class CustomTabNavigator extends React.Component {
    render() {
        const {theme, tabs} = this.props
        const navTheme = theme.bottomNavigation
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
                tabBarPosition: 'bottom',
                tabBarOptions: {
                    bottomNavigationOptions: {
                        backgroundColor: navTheme.backgroundColor,
                        rippleColor: navTheme.rippleColor,
                        tabs: _tabs
                    }
                }
            }
        )

        return <Navigator/>
    }
}

CustomTabNavigator.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string,
        component: PropTypes.any.isRequired,
    })).isRequired
}

export default withTheme(CustomTabNavigator)