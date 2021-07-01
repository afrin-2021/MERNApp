import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class LocationListing extends Component {
    constructor(props){
        super(props)
        this.inputOpenFileRef = React.createRef()
        this.state = { 
            locationList:[],
            filename:"",
            
         }
    }
    

    componentDidMount() {
        axios.get("http://localhost:5001/get/location")
        .then(res => {
            console.log(res.data)
            this.setState({locationList:res.data})
        })
    }
    onLoad = () => {
        this.inputOpenFileRef.current.click()
    }

    onSelectFile = (event) =>{
        console.log("on select",event.target)
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        console.log(file)
        
        this.setState({filename:file.name})
        
        // let reader = new FileReader()
        //     reader.readAsDataURL(file)
        //     reader.onload = () => {
        //     console.log(reader.result)
        //     this.setState({content:reader.result})
        //     };
      }

      onUpload = () =>{
        
        axios.post("http://localhost:5001/insert/provider-details",{name:this.state.filename})
        .then(() => {
            axios.get("http://localhost:5001/get/location_details")
            .then(res => {
                console.log(res.data)
                this.setState({locationList:res.data})
            })
        })
      }

    render() { 
        return ( 
            <div >
                <div className="uploadDiv center_content ">
                    <input ref={this.inputOpenFileRef} name='file' type="file" style={{ display: "none" }} onChange={this.onSelectFile}/>
                    <div className="center_content flex_column outerStyle">
                    <div className="fileName">
                    {this.state.filename ? this.state.filename : <span style={{opacity:"0.3"}}>File Name</span>}
                    </div>
                        <button className="btn btn-primary btn-sm" onClick={this.onLoad} style={{width:"150px",margin:5}}>Browse</button>
                        <button className="btn btn-primary btn-sm" onClick={this.onUpload} style={{width:"150px",margin:5}} disabled={this.state.filename ===""}> Upload</button>
                    </div>
                </div>
              {this.state.locationList.length !== 0 && (
                        <div className="center_content flex_column locationDetail">
                            <span style={{fontSize:25}}>Location List</span>
                                        <table className="table table-bordered" style={{width:"500px"}}>
                                            <thead>
                                                <tr>
                                                    <th>Address</th>
                                                    
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.locationList.map((location,index) => {
                                                    return <tr key={index}>
                                                        <td>{location._id}</td>
                                                        
                                                        <td><Link to={
                                                            {
                                                                pathname:"/location_details",
                                                                customProps:location
                                                            }}>Details</Link></td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                        </div>
              )} 
            </div>
         );
    }
}
 
export default LocationListing;