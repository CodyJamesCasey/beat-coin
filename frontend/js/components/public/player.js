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
	songYes: function(){
		document.getElementById("buy-song").style.display = "none";
	},
	songNo: function(){
		document.getElementById("buy-song").style.display = "none";
	},
	albumYes: function(){
		document.getElementById("buy-album").style.display = "none";
	},
	albumNo: function(){
		document.getElementById("buy-album").style.display = "none";
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
            	<div id="buy-song">
		        	<div id="buy">Buy this song?</div>
		        	<div id="choice">
		        		<div id ="yes" onClick={this.songYes}>
		        			<p>yes</p>
	        			</div>
		        		<div id ="no" onClick={this.songNo}>
		        			<p>no</p>
	        			</div>
		        	</div>
		        </div>
		        <div id="buy-album">
		        	<div id="buy">Buy this album?</div>
		        	<div id="choice">
		        		<div id ="yes" onClick={this.albumYes}>
		        			<p>yes</p>
	        			</div>
		        		<div id ="no" onClick={this.albumNo}>
		        			<p>no</p>
	        			</div>
		        	</div>
		        </div>
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