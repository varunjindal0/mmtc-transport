import React, { Component } from "react";
import '../stylesheets/App.css';
import { FaTrash , FaArrowRight, FaPlus } from 'react-icons/fa';
import ShowRequirement from './show_requirement'

// class ShowRequirement extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {showFull: false};
// 	}

// 	onRequiremntClick = ()=>{
// 		console.log("Requirement was clicked!!")
// 		this.setState({showFull: !this.state.showFull});
// 	}

// 	render(){
// 		if(this.state.showFull){
// 			return <div className='FullEntry' onClick={this.onRequiremntClick}>
// 					<div className='buffer'>
// 					  <div>{this.props.data.loadingStation }</div>
// 					  <div> to </div>
// 				      <div>{this.props.data.destination}</div>
// 				    </div>
// 				    <div className='buffer'>  
// 				      <div>{this.props.data.weight + ' ton'}</div>
// 				      <div>{this.props.data.loadingDate}</div>
// 				    </div>
// 				    <div className='buffer'>  
// 				      <div>{this.props.data.material}</div>
// 				      <div>{this.props.data.freight + ' rs'}</div>
// 				      <div>{this.props.data.truckType}</div>
// 				    </div>  
// 				   </div> ;
// 		}else {
// 			return <div className='Entry' onClick={this.onRequiremntClick}>
// 					  <div>{this.props.data.loadingStation }</div> 
// 					  <div> <FaArrowRight /> </div>
// 				      <div>{this.props.data.destination}</div>
// 				   </div> ;
// 		}
// 	}
// }

class App extends Component {
	constructor(props){
		super(props);
		this.state = {data: [], isLoggedIn: this.props.isLoggedIn}
		console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>>> :::: " + this.props.isLoggedIn)
	}

	fetchDataandSetState = ()=>{
		fetch('/requirements')
		.then(response=>{
			console.log(response["redirected"])
			return response.json();
		})
		.then(entries=>{
			this.setState({data: entries});
		})
		.catch(err=>{
			console.log(err);
		})
	}

	componentDidMount(){
		this.fetchDataandSetState();
	}

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
	  	
	  	var id = "idForRequiremnt:" + index;
	    document.getElementById(id).remove();
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
	  				<h1>RT GoodsCarrier</h1>
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