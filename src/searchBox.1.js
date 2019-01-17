import React from 'react'
import { Consumer } from './searchContext'
import { ANIMALS } from 'petfinder-client'

export class SearchBox extends React.Component {
  handleFormSubmit (evt) {
    evt.preventDefault()
    this.props.search()
  }

  render () {
    return (
      <Consumer>
        {({ handleRegionChange, handleRaceChange, handleBreedChange, region, race, breed, breeds, ...context }) => {
          return (
            <div className='search-params'>
              <form onSubmit={this.handleFormSubmit.bind(this)}>
                <label htmlFor='region'>Region
                  <input id='region' onChange={handleRegionChange} value={region} placeholder='region' />
                </label>
                <label htmlFor='race'>Race
                  <select id='race' onChange={handleRaceChange} onBlur={handleRaceChange} value={race} placeholder='race'>
                    <option />
                    {ANIMALS.map(animal => (<option key={animal} value={animal}>{animal}</option>))}
                  </select>
                </label>
                <label htmlFor='breed'>Breed
                  <select id='breed' onChange={handleBreedChange} onBlur={handleBreedChange} value={breed} placeholder='breed' disabled={breeds.length === 0}>
                    <option />
                    {breeds.map(breed => (<option key={breed} value={breed}>{breed}</option>))}
                  </select>
                </label>
                <button>Submit</button>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}
