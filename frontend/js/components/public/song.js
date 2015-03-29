var React   		= require('react');

var Song 			= React.createClass({

	playSong: function(event) {
    alert('play song ' + this.props.songNumber);
  	},
	buySong: function(event) {
    	document.getElementById("buy-song").style.display = "inline-block";
  	},
	getDefaultProps: function(){
		return{
			songNumber: '0',
			songTitle: 'Unknown Title',
			songLength: '0:00',
			songPurchase:'no'
		}
	},
	render: function(){
		var songNumber = this.props.songNumber;
		var songTitle = this.props.songTitle;
		var songLength = this.props.songLength;
		var songPurchase = this.props.songPurchase;
		return(
			<div className="song">
				<div className="left-button" onDoubleClick={this.playSong}>
            		<div className="song-number">
            			{songNumber}
            		</div>
            		<div className="song-title">
            			{songTitle}
            		</div>
            		<div className="song-length">
            			{songLength}
            		</div>
            	</div>
            	<div className="right-button" onClick={this.buySong}>
            		<div className="song-purchase">
            			<i className="fa fa-bitcoin fa-lg"></i>
            		</div>
            	</div>
            </div>
		)
	}
})
module.exports = Song;