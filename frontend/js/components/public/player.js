var React   		= require('react');
var Album 			= require('./album.js');
var SongList 		= require('./song-list.js');

var Player = React.createClass({
	getDefaultProps: function(){
		return{
			artistName: 'The Fratellis',
			artistPicture: '/static/img/question-mark.jpg',
			albumPicture: '/static/img/album-art/TheFratellis-CostelloMusic.jpg'
		}
	}, 
	render: function(){
		this.props.artistPicture = '/static/img/artist/TheFratellis.jpg';
		var albumTitle = 'Costello Music';
		var albumPicture = '/static/img/album-art/TheFratellis-CostelloMusic.jpg';
		var divStyle = {
  			backgroundImage: 'url(' + this.props.artistPicture + ')'
		};
		var backgroundImageStyle = {
  			backgroundImage: 'url(' + this.props.albumPicture + ')'
		};
		
		return(
			<div id="player">
				<h1 id="artist-label">
					{this.props.artistName}
				</h1>
				<div id="img-div" style={backgroundImageStyle}>
	        	</div>
            	<div id="artist-picture" style={divStyle}>
            	</div>
            	<Album albumTitle = {albumTitle} albumPicture = {albumPicture}/>
            	<SongList/>
            	<div id="song-timeline">
            		<div id="controls">
            		</div>
            		<div id="time">
            		</div>
            		<div id ="play-style">
            		</div>
            	</div>
            </div>
		)
	}
})
module.exports = Player;