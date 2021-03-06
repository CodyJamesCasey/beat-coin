var React   = require('react');
var Player  = require('./player.js');
var request = require('superagent');

var Main = React.createClass({
	search: function(){
		var search = document.getElementById("search").value;
		request
    	.get('/api')
    	.query('search=laid')
    	.end(function(err, res){
    	});
    	if(res.body.songs.length > 0){
    		alert(res.body.songs[0].name);
    	}
	},
	getDefaultProps: function(){
		return{
			profilePicture: '/static/img/question-mark.jpg'
		}
	}, 
    render: function() {
    	this.props.profilePicture = '/static/img/users/cody_casey.jpg';
    	var divStyle = {
  			backgroundImage: 'url(' + this.props.profilePicture + ')'
		};

        return (
            <main>
	            <div id="menu">
	            	<div id="profile-pic" style={divStyle}>
	            	</div>
	            	<div id="buttons">
		            	<button id="profile">Profile</button>
		            	<button id="logout">Logout</button>
		            </div>
	        	</div>
	        	<div id="search-bar">
	        		<input id="search"/>
	        		<div id="search-icon" onClick={this.search}>
	        		<i className="fa fa-search fa-3x"></i>
	        		</div>
	        	</div>
		        <Player/>
            </main>
        );
    }
});

module.exports = Main;