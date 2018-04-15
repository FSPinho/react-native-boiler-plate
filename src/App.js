import React from 'react'

import {Explore} from './pages'
import {CustomTabNavigator} from './components'
import {withTheme} from './theme'

class App extends React.Component {
    render() {
        return (
            <CustomTabNavigator position="bottom" tabs={[
                {name: 'Explore', icon: 'directions-fork', component: Explore},
                {name: 'Favorites', icon: 'heart', component: Explore},
            ]}/>
        )
    }
}

export default withTheme(App)