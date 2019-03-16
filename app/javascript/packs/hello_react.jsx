// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// import App from './render_requirements'
import App from './trial'

// Action Cable setup
import actionCable from 'actioncable'
const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://${window.location.hostname}:3000/cable')


const Hello = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}
function cableUpdate(para){
  alert("Hello global" + para);
}


document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('appointments_data');
  const isLoggedIn = JSON.parse(node.getAttribute('isLoggedIn'));
  const user_id = JSON.parse(node.getAttribute('current_user'));
  ReactDOM.render(
    <div>
      <App isLoggedIn={isLoggedIn} current_user_id={user_id} cableApp={CableApp}/>
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})
