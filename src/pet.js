import React from 'react'
import { Link } from '@reach/router'

export class Pet extends React.Component {
  render () {
    /**
     * When there are pictures:
     *  media: {
     *    photos: {
     *      photo: [
     *          {@size, $t, @id}, ...
     *       ]
     *    }
     * }
     *
     * Sometime there is no pictures: media = {}
     * */
    const defaultMedia = {
      photos: {
        photo: [
          { '@size': 'pn', 'value': 'http://photos.petfinder.com/photos/pets/43750699/1/?bust=1547252107&width=300&-pn.jpg', '@id': 1 }
        ]
      }
    }

    const { id, name, race, breed, media, region } = this.props
    let pic = (media || defaultMedia).photos.photo.filter(({ '@size': f }) => f === 'pn')

    return (
      <Link to={`/details/${id}`} className='pet'>
        <div className='image-container'>
          <img src={pic[0].value} alt={name} />
        </div>
        <div className='info'>
          <h1>{name}</h1>
          <h2>{race} - {breed} - {region}</h2>
        </div>
      </Link>
    )
  }
}
