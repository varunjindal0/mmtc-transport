import React, { Component } from "react";
import '../stylesheets/App.css';
import { FaTrash , FaArrowRight, FaPlus } from 'react-icons/fa';

class ShowRequirement extends Component {
	constructor(props){
		super(props);
		this.state = {showFull: false};
	}

	onRequiremntClick = ()=>{
		console.log("Requirement was clicked!!")
		this.setState({showFull: !this.state.showFull});
	}

	render(){
		if(this.state.showFull){
			return <div className='FullEntry' onClick={this.onRequiremntClick}>
					<div className='buffer'>
					  <div>{this.props.data.loadingStation }</div>
					  <div> to </div>
				      <div>{this.props.data.destination}</div>
				    </div>
				    <div className='buffer'>  
				      <div>{this.props.data.weight + ' ton'}</div>
				      <div>{this.props.data.loadingDate}</div>
				    </div>
				    <div className='buffer'>  
				      <div>{this.props.data.material}</div>
				      <div>{this.props.data.freight + ' rs'}</div>
				      <div>{this.props.data.truckType}</div>
				    </div>  
				   </div> ;
		}else {
			return <div className='Entry' onClick={this.onRequiremntClick}>
					  <div>{this.props.data.loadingStation }</div> 
					  <div> <FaArrowRight /> </div>
				      <div>{this.props.data.destination}</div>
				   </div> ;
		}
	}
}

export default ShowRequirement;