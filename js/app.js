/**
 * @description represents a Enemy
 * @constructor
 */
var Enemy = function(){
	this.sprite = 'images/enemy-bug.png';
	this.startBug();
};

/**
 * @description starts the bug from the randomized position
 */
Enemy.prototype.startBug = function(){
	this.x =-colWidth;
	// random  number is used to generate the bug in different rows
	// and at different speeds
	this.y=75 * randomize(1, 3);
	this.speed=randomize(50, 100);

};

/**
* @description updates the enemy's position based on the value of dt(time delta between ticks)
* @param {number} dt
* 
*/
Enemy.prototype.update = function(dt){
	
	this.x=this.x+dt*this.speed;

	if(this.x > 505){
		this.startBug();
	}

	// if collision happens move the player to the start position
	if(player.x >= this.x && player.x <= this.x+colWidth && player.y >= this.y && player.y <= this.y+rowHeight){
		player.startPlayer();
		player.updateScore(-5);
	}
};

/**
* @description drawing the enemy on the screen
* 
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Represents a player
 * @constructor
 *
 */
var Player=function(){
	
	this.sprite = 'images/char-boy.png';

	// initial position of the player
	this.startPlayer();
	
	// initial score of the player
	this.score=0;	
};


/**
 * @description updating the player's position based on the key pressed
 * @param {string} direction
 */
Player.prototype.update=function(direction){

	if(direction=="up"){
		this.y=this.y-rowHeight;
	}
	else if(direction=="down"){
		this.y=this.y+rowHeight;
	}
	else if(direction=="left"){
		this.x=this.x-colWidth;
	}
	else if(direction=="right"){
		this.x=this.x+colWidth;
	}

	this.detectGemCollision();
	
};

/**
 * @description detects whether player has picked the gem and if he has picked
 * gem will be placed in the random position
 *
 */
Player.prototype.detectGemCollision=function(){

	gems.forEach(function(gem) {
		if(player.x == gem.x && player.y == gem.y){
			player.updateScore(gem.points);
			gem.appear();
		}
	});

};

/**
 * @description updates the player score based on the event(gem pick or collision with enemy)
 *
 */
Player.prototype.updateScore=function(points){
	
	player.score=player.score + points;
	document.getElementById("result").innerHTML=player.score;
	
};

/**
* @description drawing the player on the screen
*
*/
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*

@description passes the value to the update function based on key pressed
@param {string} value
 */
Player.prototype.handleInput=function(value){


	if(value=="up" && this.y >0){	
		this.update(value);
	}
	else if(value=="left" && this.x > 0){
		this.update(value);
	}
	else if(value=="down" && this.y < 415){	
		this.update(value);	
	}
	else if(value=="right" && this.x < 404){	
		this.update(value);
	}
				
};

/**
 * @description used to move the player to the initial position
 *
 */
Player.prototype.startPlayer=function(){

	this.x=playerStartposX;
	this.y=playerStartposY;
	
};

/**
 * @description Represents a gem
 * @constructor
 *
 */
var Gem=function(){
	this.appear();
};

/**
 * @description Randomly position's the gem
 *
 */
Gem.prototype.appear=function(){

	this.x = colWidth * randomize(0,5);
	this.y = rowHeight * randomize(1,3);

};

/**
 * @description draws the gem on the screen
 *
 */
Gem.prototype.render=function(){

	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
 * @description Represents a Orange gem
 * @constructor
 *
 */
var GemOrange=function(){

	Gem.call(this);
	this.sprite='images/gem-orange.png';
	this.points=5;
};

GemOrange.prototype=Object.create(Gem.prototype);
GemOrange.prototype.constructor=Gem;


/**
 * @description Represents a Blue gem
 * @constructor
 *
 */
var GemBlue=function(){

	Gem.call(this);
	this.sprite='images/gem-blue.png';
	this.points=10;

};

GemBlue.prototype=Object.create(Gem.prototype);
GemBlue.prototype.constructor=Gem;

/*
	global variables used in the program

*/

var colWidth = 101,
    rowHeight = 83,
    playerStartposX = 202,
    playerStartposY = 415;


var gems=[new GemBlue(), new GemOrange()];
var allEnemies=[new Enemy(), new Enemy(), new Enemy()];
var player=new Player();


/**
 * @description global function returns random number >=min and <=max value
 * @param {number} min
 * @param {number} max
 * @returns {number} random number >=min and <=max value
 */
function randomize(min,max){
	return Math.floor((Math.random() * max) + min);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});