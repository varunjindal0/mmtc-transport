import React, { Component } from "react";
import '../stylesheets/App.css';
import { FaTrash , FaArrowRight, FaPlus } from 'react-icons/fa';
import ShowRequirement from './show_requirement'

ActionCable = require('actioncable');
 


class App extends Component {
	constructor(props){
		super(props);
		this.state = {data: [], isLoggedIn: this.props.isLoggedIn}
		console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>>> :::: " + this.props.isLoggedIn)
	}

	componentDidMount() {
	    this.fetchDataandSetState();

	    var cable = ActionCable.createConsumer('/cable');
 
		cable.subscriptions.create({channel: 'RequirementsChannel'}, {
		  // normal channel code goes here...
		  connected: ()=>{
		  	// Called when the subscription is ready for use on the server
		  },
		
		  disconnected: ()=>{
		  	// Called when the subscription has been terminated by the server
		  },
		    
		  received: (data) =>{
		  	// Called when there's incoming data on the websocket for this channel
		  	if(data.requirement_to_render.delete){
		  		var arr = [];
		  		this.state.data.map(elem=>{
		  			if(elem.id !== data.requirement_to_render.requirement_id){
		  				arr.push(elem);
		  			}
		  		})
		  		this.setState({data: arr});
		  	}else {
		  		this.setState(prevState => ({
				  data: [...prevState.data, data.requirement_to_render]
				}))
		  	}
		    
		  }
		 });
		    
	}

	fetchDataandSetState = ()=>{
		fetch('/requirements')
		.then(response=>{
			console.log(response)
			return response.json();
		})
		.then(entries=>{
			this.setState({data: entries});
		})
		.catch(err=>{
			console.log(err);
		})
	}

	// componentDidMount(){
	// 	this.fetchDataandSetState();
	// }

  handleAdminButtonPress = ()=>{
  	window.location.assign("/users/sign_in")
  }

  handleLogoutButtonPress = ()=>{
   fetch('/users/sign_out', {
  		method: 'delete'
  	})
  	.then(noIdea=>{
  		console.log(noIdea);
  		window.location.assign("/");
  	})
  	.catch(err=>{
  		console.log(err);
  		alert(err);
  	})
  }

  addNewRequirement = ()=>{
  	window.location.assign("/requirements/new");
  }

  onDeletePress = (requirement, index)=>{
  	console.log('Delete request accepted for: ' + requirement.id + "isLoggedIn:  ");
  	var result = window.confirm("Are you sure to delete this entry?");
  	if(result){
  		fetch('/requirements/' + requirement.id, {
  		method: 'delete'
	  	})
	  	.then(noIdea=>{
	  		console.log(noIdea);

	  	})
	  	.catch(err=>{
	  		console.log(err);
	  		alert(err);
	  	})
	  	
	  	// var id = "idForRequiremnt:" + index;
	   //  document.getElementById(id).remove();
  	}else{
  		return ;
  	}
  	
  }

  render() {
  	if(this.state.data.length === 0 ){
  		return <div className='App'>Loading data...</div>
   	}else {
   		if(this.state.isLoggedIn){
   			return (
   				<div className='App' id="RequirementArea">
   					<h1>MMTC Transport Carrier</h1>
	  				<button style={{marginBottom: '20px'}} onClick = {this.handleLogoutButtonPress}>Logout!</button>
	  				<div style={{marginBottom: '20px'}} onClick={this.addNewRequirement}><FaPlus /></div>
	  				{
	  					this.state.data.map((requirement, index)=>{
	  						return (
	  						<div key={index} id={"idForRequiremnt:" + index} className='AdminViewEntry'>
	  							<ShowRequirement data={requirement} />
	  							<div style={{marginLeft: '5px'}}  onClick={()=>this.onDeletePress(requirement, index)}><FaTrash /></div>
	  						</div>
	  						)
	  					})
	  				}
	  			</div>
   			)
   		}else {
   			return (
	  			<div className='App'>
	  				<h1>MMTC Transport Carrier</h1>
	  				<button style={{marginBottom: '20px'}} onClick = {this.handleAdminButtonPress}>Switch to Admin View!</button>
	  				{
	  					this.state.data.map((requirement, index)=>{
	  						return (
	  							<ShowRequirement key={index} data={requirement} />
	  						)
	  					})
	  				}
	  			</div>
  		)
   		}
  		
  	}
  }
}

export default App;