import React from 'react'
import Theme from './Theme'

const withTheme = WrappedComponent =>
    class extends React.Component {
        render() {
            const {props} = this
            return <WrappedComponent {...props} theme={Theme}/>
        }
    }

export default withTheme