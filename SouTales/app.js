// set a variable to call the canvas element
const canvas = document.querySelector('canvas');
// set c to be to get the 2D rendering context from canvas element, so you can draw in it.
const c = canvas.getContext('2d');
// set the canvas elements width and height
canvas.width = 1024;
canvas.height = 576;

// style the canvas element to be white, i do this to see the bordersand resize
c.fillStyle = 'white'
// create a rectangle on the canvas
c.fillRect(0, 0, canvas.width, canvas.height);

// set image to create a new instance of a image object 
const image = new Image()
// entering the source of the image
image.src = './Images/Level1 Grass plane.png'
console.log(image);

//the Image object that is triggered when the image has finished loading.
image.onload = () => {
    //2D rendering context that draws the image at the specified position
    c.drawImage(image, 0, 0)
}

// background created 
