import React from 'react'
import { Pet } from './pet'
import pf from 'petfinder-client'
import { SearchBox } from './searchBox.1'
import { Consumer } from './searchContext'

const petfinder = pf({
  key: '52b3e43702f602b064a403dafaf2ab76',
  secret: 'd3a83255c7f843d53456703529f1dadb'
})

export class Results extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pets: []
    }

    this.search = () => {
      const { searchParams: { region: location, race: animal } } = this.props
      petfinder.pet.find({
        output: 'full',
        location,
        animal
      })
        .then(({ petfinder: { pets: { pet = [] } } }) => {
          let pets = Array.isArray(pet) ? pet : [pet]
          this.setState({
            pets
          })
        })
    }
  }

  componentDidMount () {
    this.search()
  }

  render () {
    return (
      <div className='search'>
        <SearchBox search={this.search} />
        {
          this.state.pets.map(({ id, animal, name, breeds: { breed }, media, contact: { city, state } }) => (
            <Pet id={id} key={id} race={animal} name={name} breed={Array.isArray(breed) ? breed.join(', ') : breed} media={media} region={`${city}, ${state}`} />
          ))
        }
      </div>
    )
  }
}

export const ResultsContext = props => (<Consumer>{
  context => {
    return (<Results {...props} searchParams={context} />)
  }
}</Consumer>)
