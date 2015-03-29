var React   		= require('react');

var Album = React.createClass({

	buyAlbum: function(event) {
    	document.getElementById("buy-album").style.display = "inline-block";
  	},
	getDefaultProps: function(){
		return{
			albumTitle: 'Unknown Album',
			albumPicture: '/static/img/question-mark.jpg',
			albumPurchased: 'no'
		}
	},
	render: function(){
		var albumTitle = this.props.albumTitle;
		var albumPicture = this.props.albumPicture;
		var albumPurchased = this.props.albumPurchased;
		return(
			<div id="album">
        		<img id="album-art" src={albumPicture}>
        		</img>
        		<div id="album-info">
        			<div id="album-title">
        				{albumTitle}
        			</div>
        			<div id="album-purchase" onClick={this.buyAlbum}>
        				<i className="fa fa-bitcoin fa-2x"></i>
        			</div>
        		</div>
        	</div>
		)
	}
})
module.exports = Album;