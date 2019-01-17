import React from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.querySelector('#modal')

export class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.div = document.createElement('div')
  }

  componentDidMount () {
    modalRoot.appendChild(this.div)
  }

  componentWillUnmount () {
    modalRoot.removeChild(this.div)
  }

  render () {
    return createPortal(this.props.children, this.div)
  }
}
