import React, { Component } from 'react';
import axios from "axios"
class LocationDetails extends Component {
    state = { 
        location:{},
        businessInfo:{},
        provider:[]
     }

    componentDidMount(){
        this.setState({location:this.props.location.customProps})
        let res = this.props.location.customProps
        this.setState({businessInfo:res.BusinessInfo[0]})
        this.setState({provider:res.Provider})
    }
    render() { 
        return ( <div>
            <h3 className="heading">Service Location Details</h3>
            <div className="business_name">
                <h3>Business Name : {this.state.businessInfo["BusinessName"]}</h3>
            </div>
            <div className="display_no">
                <span style={{margin:10}}><b>Phone Number : {this.state.businessInfo["Phone"]}</b></span>
                <button className="btn btn-success btn-sm" style={{margin:5}}>Call</button>
                <button className="btn btn-primary btn-sm" style={{margin:5}}>Listen the call record</button>
            </div>
            <div className="background_blue">
                <h4 style={{padding:5}}>Service Location Details</h4>
            </div>
            <div style={{margin:10,marginLeft:20}}>
                <div className="bottom_space">
                    <p style={{fontSize:12}}>Business Name</p>
                    <span >{this.state.businessInfo["BusinessName"]}</span>
                </div>
                <div className="bottom_space">
                    <p style={{fontSize:12}}> Service Location Address</p>
                    <span >{this.state.location["_id"]} <br/>{this.state.businessInfo["City"]} &nbsp;{this.state.businessInfo["State"]}</span>
                </div>
                <div className="bottom_space">
                    <table id="phone_table">
                        <thead>
                            <tr>
                                <td style={{fontSize:12}}>Service Location Phone</td>
                                <td style={{fontSize:12}}>Service Location Fax</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.businessInfo["Phone"]}</td>
                                <td>{this.state.businessInfo["Fax"]}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    
                </div>
                <div style={{borderBottom:"1px solid grey"}}>
                
                
                </div>
            </div>
            <div className="background_blue" style={{display:'flex',justifyContent:"space-between",padding:5}}>
                <span style={{padding:5}}>Provider Details</span>
                <button className="btn btn-primary btn-sm">Add Provider</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Gender</td>
                        <td>Prof Designation</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.provider.map((provider,index) => {
                        return <tr key={index}>
                            <td>{provider.first}</td>
                            <td>{provider.last}</td>
                            <td>{provider.Gender}</td>
                            <td>{provider.Desg}</td>
                            <td><button className="btn btn-primary btn-sm">View</button></td>
                        </tr>
                    })}
                    
                </tbody>
            </table>

        </div>);
    }
}
 
export default LocationDetails;