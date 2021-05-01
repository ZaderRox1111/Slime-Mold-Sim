//global constants
var gravity = 0;

var NUMBER_OF_PARTICLES = 10;

var WIN_WIDTH = 600;
var WIN_HEIGHT = 600;

//particle function
function Particle(x, y, radius, tailLength)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.tailLength = tailLength;
    
    this.ySpeed = 0;
    this.xSpeed = 0;
    
    this.history = [];
    
    var locationVector;
    
    //create an update function
    this.update = function()
    {
        //update position and velocity
        this.updatePosSpeed();
        
        //check collisions with walls
        this.checkForCollisions();
        
        //create and manage the tail
        this.updateTail();
    };
    
    //create a showing function to draw the particle
    this.show = function()
    {
        //variables
        var index;
        
        //draws every location in the history
        for (index = 0; index < this.history.length; index++)
        {
            //get the x and y values from the history
            var xHist = this.history[index][0];
            var yHist = this.history[index][1];
            
            //change the point size with the spot in history
            var histRadius = this.radius * (index / this.history.length);
            
            //draw an ellipse at the history point
            noStroke();
            fill(200, 200, 200);
            ellipse(xHist, yHist, histRadius, histRadius);
        }
        
        //draw the main ellipse
        fill(97, 97, 97);
        ellipse(this.x, this.y, this.radius, this.radius);
    };

    this.checkForCollisions = function() 
    {
    	//check collisions with border
    	if (this.y > WIN_HEIGHT)
        {
            //so it never is caught in an infinite loop
            this.y = WIN_HEIGHT;
            this.ySpeed = -0.9 * this.ySpeed;
        }
        else if (this.y < 0)
        {
            this.y = 0;
            this.ySpeed = -0.9 * this.ySpeed;
        }
        if (this.x > WIN_WIDTH)
        {
            //so it never is caught in an infinite loop
            this.x = WIN_WIDTH;
            this.xSpeed = -0.9 * this.xSpeed;
        }
        else if (this.x < 0)
        {
            this.x = 0;
            this.xSpeed = -0.9 * this.xSpeed;
        }
    };

    this.updatePosSpeed = function() 
    {
    	//update position then speed
        this.x += this.xSpeed;
    	this.y += this.ySpeed;
        this.xSpeed += Math.cos(this.x * 25);
        this.ySpeed += gravity + Math.sin(this.y * 25);
    };

    this.updateTail = function()
    {
    	//put the current location into the history
        locationVector = [this.x, this.y];
        this.history.push(locationVector);
        
        //if the history is longer than tail length, splice it off
        if (this.history.length > this.tailLength)
        {
            this.history.splice(0, 1);   
        }
    };

    //goes over every pixel on screen and uses a box blur to blur it
    this.blurScreen = function()
    {
    	var black = color(0);
    	set(30, 20, black);
    	updatePixels();
    };
}

function PixelParticle(x, y, direction)
{
	//set initial values
	this.x = x;
	this.y = y;
	this.direction = direction;

	//set individual directions
	this.dirX = Math.cos(this.direction);
	this.dirY = Math.sin(this.direction);

	//function to update the particle
	this.update = function()
	{
		//draw the particle
		this.show();

		//check for collisions
		this.checkForCollisions();

		//move the particle
		this.move();

		//blur the particles
	};

	//draws the particle at the location
	this.show = function() 
	{
		//set the pixel at the location
		var white = color(255);
		set(this.x, this.y, white);
	};

	this.move = function()
	{
		this.x += this.dirX;
		this.y += this.dirY;
	};

	this.checkForCollisions = function() 
    {
    	//check collisions with border
    	if (this.y > WIN_HEIGHT - 1)
        {
            this.dirY = -this.dirY;
        }
        else if (this.y < 1)
        {
            this.dirY = -this.dirY;
        }
        if (this.x > WIN_WIDTH - 1)
        {
            this.dirX = -this.dirX;
        }
        else if (this.x < 1)
        {
            this.dirX = -this.dirX;
        }
    };
}

//makes an array filled with particles and returns it
function makeMultiplePixelParticles(numberParticles)
{
	//create variables
	var index;
	//create empty array with size of number of Particles
	var particlesArray = new Array(numberParticles);

	//fill the array with particles
	for(index = 0; index < numberParticles; index++)
	{
		particlesArray[index] = new PixelParticle(500, 500, Math.random());
	}

	//return the array
	return particlesArray;
}

function updateAllParticles(particlesArray, numberParticles)
{
	//create variables
	var index;

	//update each particle in the array
	for(index = 0; index < numberParticles; index++)
	{
		particlesArray[index].update();
	}

	//update all the pixels
	updatePixels();
}

var particle1 = new Particle(100, 100, 15, 25);
var particle2 = new PixelParticle(500, 500, 1);

particlesArray = makeMultiplePixelParticles(NUMBER_OF_PARTICLES);

function setup() {
  	// put setup code here
  	var canvas = createCanvas(WIN_WIDTH, WIN_HEIGHT);

  	//put the sketch under an html id
  	canvas.parent('sketch-holder');
}

function draw() {
/*  	// put drawing code here
  	//draw background first
  	background(220);

  	//draw and update particle
  	particle1.show();
    particle1.update();
*/

	//draw and update the particle
	particle2.update();
	updateAllParticles(particlesArray, NUMBER_OF_PARTICLES);
}