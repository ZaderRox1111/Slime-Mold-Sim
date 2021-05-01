//global constants
var gravity = 0;

var NUMBER_OF_PARTICLES = 10;
var EVAPORATION_RATE = 0;

var WIN_WIDTH = 600;
var WIN_HEIGHT = 600;

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
		particlesArray[index] = new PixelParticle(300, 300, Math.PI * 2 * Math.random());
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




var particle2 = new PixelParticle(500, 500, 1);

particlesArray = makeMultiplePixelParticles(NUMBER_OF_PARTICLES);

function setup() {
  	// put setup code here
    //set pixel density to one
    pixelDensity(1);
  	var canvas = createCanvas(WIN_WIDTH, WIN_HEIGHT);

  	//put the sketch under an html id
  	canvas.parent('sketch-holder');
}

function draw() {
	//draw and update the particle
    background(10);
	//particle2.update();
	updateAllParticles(particlesArray, NUMBER_OF_PARTICLES);
}