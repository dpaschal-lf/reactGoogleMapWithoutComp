import React, { Component } from 'react';
import './gmap.css';

class Gmap extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		mapPointer: null,
  		markers: {}
  	}
  	this.renderMarkers = this.renderMarkers.bind(this);

  }
  componentDidMount(){
  	var mapProp= {
	  center:new window.google.maps.LatLng(51.508742,-0.120850),
	  zoom:2,
	};
  	const map = new window.google.maps.Map(this.refs.damap,mapProp);
  	this.setState({
  		mapPointer: map
  	})

  }
  componentDidUpdate(prevProps){
  	const prevLength = Object.keys(prevProps.markers).length;
  	const currentLength = Object.keys(this.props.markers).length;
  	if(prevLength !== currentLength){
  		if(prevLength > currentLength){
  			const markersToRemove = {...this.state.markers};
  			for( let key in markersToRemove){
  				if( this.props.markers.hasOwnProperty(key)){
  					delete markersToRemove[key];
  				}
  			}
  			
  			for(let key in markersToRemove){
  				markersToRemove[key].setMap(null);
  			}
  			return;
  		}
  		this.renderMarkers();
  	}
  }
  renderMarkers(){
  	console.log('rendering markers');
  	const stuff = this;//why the hell did I need this?  I bound that sucker!
  	const googleMarkers = {};
  	for( let key in this.props.markers){

  		let marker = this.props.markers[key];
  		console.log(stuff);
  		let position = new window.google.maps.LatLng(marker.lat, marker.lng);
  		const markerObject = new window.google.maps.Marker({
  			position: position,
  			map: stuff.state.mapPointer,
  			title: 'stuff'
  		});

  		googleMarkers[key] = markerObject;
  	}
  	this.setState({
  		markers: googleMarkers
  	})
  	


  }
  render() {
    return (
      <div className="mapContainer" ref="damap">
      	
      </div>
    );
  }
}

export default Gmap;
