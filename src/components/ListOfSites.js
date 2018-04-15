import React from 'react';
import List from './List'


import sites from '../sample-data/sites'


class ListOfSites extends React.Component {

    loadItems = () =>
        new Promise((a) => a([
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites,
            ...sites
        ]))

    render() {
        const {props} = this

        return (<List {...props} loadItems={this.loadItems}/>)
    }
}

ListOfSites.propTypes = {}

export default ListOfSites