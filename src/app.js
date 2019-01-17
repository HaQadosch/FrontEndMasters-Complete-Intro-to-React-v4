import React from 'react'
import ReactDOM from 'react-dom'
import { ResultsContext } from './results'
import { Details } from './details'
import { Router, Link } from '@reach/router'
import { SearchParams } from './searchParams'
import pf from 'petfinder-client'
import { Provider } from './searchContext'

const petfinder = pf({
  key: '52b3e43702f602b064a403dafaf2ab76',
  secret: 'd3a83255c7f843d53456703529f1dadb'
})

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      region: 'Ontario, ON',
      race: '',
      breed: '',
      breeds: [],
      handleRegionChange: this.handleRegionChange.bind(this),
      handleRaceChange: this.handleRaceChange.bind(this),
      handleBreedChange: this.handleBreedChange.bind(this),
      getBreeds: this.getBreeds
    }
  }

  handleRegionChange ({ target: { value: region } }) {
    this.setState({
      region
    })
  }

  handleBreedChange ({ target: { value: breed } }) {
    this.setState({
      breed
    })
  }

  handleRaceChange ({ target: { value: race } }) {
    this.setState({
      race
    }, this.getBreeds)
  }

  getBreeds () {
    if (this.state.race) {
      petfinder.breed.list({ animal: this.state.race })
        .then(({ petfinder: { breeds: { breed = [] } } }) => {
          this.setState({
            breed: '',
            breeds: Array.isArray(breed) ? breed : [breed]
          })
        })
    } else {
      this.setState({ breeds: [] })
    }
  }

  render () {
    return (
      <div>
        <header>
          <Link to='/'>Adopt Me!</Link>
          <Link to='/search-params'><span aria-label='search' role='imp'>🔎🔍</span></Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <ResultsContext path='/' />
            <Details path='/details/:id' />
            <SearchParams path='/search-params' />
          </Router>
        </Provider>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
