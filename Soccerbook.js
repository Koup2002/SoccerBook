function loadPlayers(){
	var ret = JSON.parse(localStorage.getItem("playerlist"))
	if(ret != null) return ret;
	var i = 1;
	return [
		{
			id : i++,
			lastname : "Buffon",
			firstname : "Paul",
			picUrl : "https://cdn.24.co.za/files/Cms/General/d/7266/8e89a15d88ae41bd8ccaf79fbc5188b1.jpg",
			nationality : "IT",
			rating : 2,
		},
		{
			id : i++,
			lastname : "Neuer",
			firstname : "Manuel",
			picUrl : "https://www.welt.de/img/sport/fussball/bundesliga/fc-bayern-muenchen/mobile176038108/3252504107-ci102l-w1024/Manuel-Neuer.jpg",
			nationality : "DE",
			rating : 4,
		},
		{
			id : i++,
			lastname : "Özil",
			firstname : "Mesut",
			picUrl : "https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p37605.png",
			nationality : "DE",
			rating : 3,
		}
		
	]
}
function createPlayer(){
	return[
		{
			id : new Date().getTime(),
			lastname:"",
			firstname : "",
			picUrl : "",
			nationality : "",
			rating : 0
		}][0]
}

function findPlayerWithId(playerId){
	for (i = 0; i < app.playerlist.length; i++) { 
	    if(app.playerlist[i].id == playerId) return app.playerlist[i]
	}
	return null
}
function getPlayerIndex(playerId){
	for (i = 0; i < app.playerlist.length; i++) { 
	    if(app.playerlist[i].id == playerId) return i
	}
	return -1
}
function playerWithIdExists(playerId){
	return findPlayerWithId(playerId) != null
}

function removePlayerWithId(playerId){
	app.playerlist.splice(getPlayerIndex(playerId),1)
}
var app = new Vue({
	  el: '#app',
	  data: {
		playerlist : loadPlayers(), 
		currentPlayer : createPlayer(),
		currentPlayerisNew : true, 
	    message: 'Hello Vue!',
	    playerListVisible : true,
	    addPlayerVisible : false
	  },
	  methods: {
		  editPlayer: function (playerId) {
			  this.currentPlayer = findPlayerWithId(playerId)
			  this.currentPlayerisNew = false
			  this.gotoeditplayer()
		  },
		  addPlayer: function (playerId) {
			  this.currentPlayer = createPlayer()
			  this.currentPlayerisNew = true
			  this.gotoeditplayer()
		  },
		  onSubmit: function () {
			  if(!playerWithIdExists(this.currentPlayer.id)) {
			  	this.playerlist.push(this.currentPlayer)  
			  }
			  this.gotoplayerlist()
		  },
		  onReset: function () {
			     this.gotoplayerlist()
			 },
		  onDelete: function (playerId) {
			  	 removePlayerWithId(this.currentPlayer.id)
			     this.gotoplayerlist()
			},
		  gotoeditplayer: function () {
		      this.playerListVisible = false
		      this.addPlayerVisible = true
		  },
		  gotoplayerlist: function () {
		      this.playerListVisible = true
		      this.addPlayerVisible = false
		  }
	  },
	  components:{
		    'star-rating': VueStarRating.default
		  }
	})

window.onunload  = function(){
	localStorage.setItem("playerlist",JSON.stringify(app.playerlist));
	};