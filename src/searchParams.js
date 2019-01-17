import React from 'react'
import { SearchBox } from './searchBox.1'
import { navigate } from '@reach/router'

export class SearchParams extends React.Component {
  handleSearchSubmit () {
    console.log('handleSearchSubmit')

    navigate('/')
  }

  render () {
    return (
      <div className='search-route'>
        <SearchBox search={this.handleSearchSubmit} />
      </div>
    )
  }
}
