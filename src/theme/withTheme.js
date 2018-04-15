import React from 'react'
import Theme from './Theme'

const withTheme = WrappedComponent =>
    class extends React.Component {
        setNativeProps = (nativeProps) => {
            if (this.refs.root)
                this.refs.root.setNativeProps(nativeProps);
        }

        render() {
            const {props} = this
            return (typeof WrappedComponent === 'function') ?
                <WrappedComponent {...props} theme={Theme}/>
                : <WrappedComponent ref="root" {...props} theme={Theme}/>
        }
    }

export default withTheme