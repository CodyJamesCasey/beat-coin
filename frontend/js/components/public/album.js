var React   		= require('react');

var Album = React.createClass({

	buy: function(){
		alert("buy album");
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
        			<div id="buy-album" onClick={this.buy}>
        				<i className="fa fa-bitcoin fa-2x"></i>
        			</div>
        		</div>
        	</div>
		)
	}
})
module.exports = Album;