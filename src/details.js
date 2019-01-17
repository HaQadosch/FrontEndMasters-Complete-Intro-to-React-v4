import pf from 'petfinder-client'
import React from 'react'
import { navigate } from '@reach/router'
import { Carousel } from './carousel'
import { Modal } from './modal'

const petfinder = pf({
  key: '52b3e43702f602b064a403dafaf2ab76',
  secret: 'd3a83255c7f843d53456703529f1dadb'
})

export class Details extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      showModal: false
    }

    this.toggleModal2 = _ => this.setState({ showModal: !this.state.showModal })
  }

  toggleModal () {
    this.setState({ showModal: !this.state.showModal })
  }

  componentDidMount () {
    petfinder.pet.get({
      output: 'full',
      id: this.props.id
    }).then(({
      petfinder:
      {
        pet:
        {
          breeds:
          {
            breed: breedOrS
          },
          name,
          animal: race,
          contact:
          {
            city,
            state
          },
          description,
          media
        }
      }
    }) => {
      let breed = Array.isArray(breedOrS) ? breedOrS.join(', ') : breedOrS
      this.setState({
        name,
        race,
        breed,
        description,
        media,
        region: `${city}, ${state}`,
        loading: false
      })
    }).catch(_ => {
      // this.setState({ error })
      navigate('/')
    })
  }

  render () {
    if (this.state.loading) {
      return <h1>loading ...</h1>
    }

    const { name, race, breed, region, description, media, showModal } = this.state
    return (
      <div className='details'>
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{race} - {breed} - {region}</h2>
          <button onClick={this.toggleModal.bind(this)}>Adopt {name}</button>
          <p>{description}</p>
          {
            showModal
              ? (<Modal>
                <h1>Would you like to adopt {name}?</h1>
                <div className='buttons'>
                  <button onClick={this.toggleModal.bind(this)}>Yes 👌</button>
                  <button onClick={this.toggleModal2}>No</button>
                </div>
              </Modal>)
              : void 0
          }
        </div>
      </div>
    )
  }
}
