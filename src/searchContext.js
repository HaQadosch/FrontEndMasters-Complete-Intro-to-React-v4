import React from 'react'

const SearchContext = React.createContext({
  region: 'Ontario, ON',
  race: '',
  breed: '',
  breeds: [],
  handleRegionChange () {},
  handleRaceChange () {},
  handleBreedChange () {},
  getBreeds () {}
})

export const { Provider, Consumer } = SearchContext
