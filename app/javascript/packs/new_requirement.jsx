import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../stylesheets/Login.css';

class NewRequirement extends Component {
    constructor(){
        super();
        this.state = {};

    }

    onNewRequirementSubmit = (e)=>{
        console.log("submit button was pressed!");
        if(this.state.loadingStation && this.state.destination && this.state.weight && this.state.loadingDate && this.state.material && this.state.truckType){
            console.log("Submit button was pressed!! Before Fetch!");
            fetch('http://localhost:3000/requirements', {
               method: 'post',
               headers: {
                 'Content-Type': 'application/json'
                },
               body: JSON.stringify({
                loadingStation: this.state.loadingStation,
                destination: this.state.destination,
                weight: this.state.weight,
                loadingDate: this.state.loadingDate,
                material: this.state.material,
                freight: this.state.freight,
                truckType: this.state.truckType
                })
             })
            .then(res=>{
                window.location.replace("/");
            })
            .catch(err=>{
                console.log("What the hell! " + err);
            })
        }else {
            alert("You can not leave mandatory fields empty!!")
        }
        
    }


    handleChange = (e)=>{
        this.setState(
            {
                 [e.target.name]: e.target.value
            }
        )
    }

    render(){
        return (
             <div className="center">
              <div className="card">
                <h1>New Requirement</h1>
                    <input
                        className="form-item"
                        placeholder="Loading Station"
                        name="loadingStation"
                        type="text"
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        className="form-item"
                        placeholder="Destination"
                        name="destination"
                        type="text"
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        className="form-item"
                        placeholder="Weight"
                        name="weight"
                        type="number"
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        className="form-item"
                        placeholder="Date of Loading"
                        name="loadingDate"
                        type="date"
                        onChange={this.handleChange}                   
                        required
                    />
                    <input
                        className="form-item"
                        placeholder="Material"
                        name="material"
                        type="text"
                        onChange={this.handleChange}                     
                        required
                    />
                    <input
                        className="form-item"
                        placeholder="Freight"
                        name="freight"
                        type="number"
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        className="form-item"
                        placeholder="Truck type"
                        name="truckType"
                        type="text"
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        className="form-submit"
                        value="SUBMIT"
                        type="submit"
                        onClick = {this.onNewRequirementSubmit}
                    />
            </div>
        </div>
            )
    }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <NewRequirement />
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
})

// export default NewRequirement;