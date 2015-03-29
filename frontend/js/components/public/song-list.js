var React   		= require('react');
var Song			= require('./song.js');

var SongList = React.createClass({
		render: function(){
			var rows = [];
			var numrows = 20;
			for (var i=0; i < numrows; i++) {
				rows.push(<Song songNumber = {i}/>);
			}
			return(
				<div id="song-list">
					<div>
            			{rows}
            		</div>
            	</div>
			)
		}
})
module.exports = SongList;