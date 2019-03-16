import React, { Component } from "react";

class ShowQuotations extends Component {
	constructor(props){
		super(props);
		this.state = {data: []};
	}

	componentDidMount(){
		fetch("/requirements/" + this.props.requirement_id + '/quotations')
		.then(res=>{
			return res.json();
		})
		.then(jsonRes=>{
			if(jsonRes['unauthorized_access']){

			}else {
				this.setState({data: jsonRes})
			}
			
		})
		.catch(err=>{
			console.log("Error: " + err);
		})
	}

	render(){
		return (
			<ol>
				{
					this.state.data.map((quotation, index)=>{
					   // var stringToRender = quotation['user_id']['email'] "::: " + quotation['value'];
					   var stringToRender = quotation.user.email + " says: " + quotation.value
						return (
								<li key = {index}>
									{stringToRender}
								</li>
							)
					})
				}
			</ol>
			)
	}
}

export default ShowQuotations