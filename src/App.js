import React, { Component } from 'react';
import './App.css';
import Gmap from './map/gmap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentMarkers: 3,
      markers: {
        24: {lat: 51, lng: -0.2},
        28: {lat: 60, lng: -1},
        38: {lat: 35, lng: -1}
      },
      lat: 51.5074,
      lon: -0.1278
    }
    this.updateData = this.updateData.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
  }
  updateData(e){
    const val = e.target.value;
    const name = e.target.getAttribute('name');
    console.log('test');
    this.setState({
      [name]: val
    });
    return true;
  }
  addLocation(){
    const currentTime = window.performance.now();
    const markers = {...this.state.markers};
    markers[currentTime] = {lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lon)}
    this.setState({
      markers: markers,
      currentMarkers: this.state.currentMarkers+1
    });
  }
  removeMarker(index){
    const newMarkers = {...this.state.markers};
    delete newMarkers[index]
    this.setState({
      markers: newMarkers,
      currentMarkers: this.state.currentMarkers-1
    });
  }
  displayMarkers(){
    const outputDivs = [];
    for( let key in this.state.markers){
      outputDivs.push( <div className="markerLabel" key={key} onClick={()=>this.removeMarker(key)}>Marker { `${Math.floor(key)}: ${this.state.markers[key].lat}, ${this.state.markers[key].lng}`}</div> );
    }
    return outputDivs;
  }
  render() {

    return (
      <div className="App">
        <Gmap markers={this.state.markers}/>
        <div>I preloaded it with some points, so click add to add a new one and to show them all.  I didn't make it prerender them in my original pass</div>
        <div>click on one of the labels below to the tell the map to remove them</div>
        <input name="lat" type="text" onChange={this.updateData} placeholder="latitude" value={this.state.lat}/>
        <input name="lon" type="text" onChange={this.updateData} placeholder="latitude" value={this.state.lon}/>
        <button onClick={this.addLocation}>ADD</button>
        <div id="markers">
          {this.displayMarkers()}
        </div>
        <div>side note: it probably would have been a lot easier to wipe the map and start again, but I didn't want to have them all drop or animate if you were doing that</div>
      </div>
    );
  }
}

export default App;
