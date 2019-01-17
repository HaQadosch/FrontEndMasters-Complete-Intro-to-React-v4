import React from 'react'

export class Carousel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      active: 0,
      photos: []
    }

    this.handleIndexClick = ({ target: { dataset: { index } } }) => {
      this.setState({
        active: +index
      })
    }
  }

  static getDerivedStateFromProps ({ media: { photos: { photo } } }) {
    let pn = photo.filter(({ '@size': size }) => size === 'pn')
    return { photos: pn }
  }

  render () {
    const { photos, active } = this.state

    return (
      <div className='carousel'>
        <img src={photos[active].value} alt='animal primary' />
        <div className='carousel-smaller'>
          {photos.map(({ value, ..._ }, index) => (
            <img
              onClick={this.handleIndexClick}
              key={value}
              data-index={index}
              src={value}
              className={index === active ? 'active' : ''}
              alt='animal thumbnail'
            />
          ))}
        </div>
      </div>
    )
  }
}
