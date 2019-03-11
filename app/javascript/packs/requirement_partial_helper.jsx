import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ShowRequirement from './show_requirement'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('requirement_data')
  const requirement = JSON.parse(node.getAttribute('requirement'))
  ReactDOM.render(
      <ShowRequirement requirement={requirement}/>,
    document.body.appendChild(document.createElement('div')),
  )
})