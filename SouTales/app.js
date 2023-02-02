// set a variable to call the canvas element
const canvas = document.querySelector('canvas');
// set c to be to get the 2D rendering context from canvas element, so you can draw in it.
const c = canvas.getContext('2d');
// set the canvas elements width and height
canvas.width = 805;
canvas.height = 600;

// style the canvas element to be white, i do this to see the bordersand resize
c.fillStyle = 'white'
// create a rectangle on the canvas
c.fillRect(0, 0, canvas.width, canvas.height);

// create a new instance of Image object and set it to the variable image
const image = new Image()
// set the source of the image to the given path
image.src = './Images/Level1 Grass plane.png'
// log the image object to the console
console.log(image)

// set the onload event for the image object to be triggered when the image has finished loading
image.onload = () => {
    // draw the image on the 2D rendering context c at position (0, 0)
    c.drawImage(image, 0, 0)
}

//
// create a new instance of Image object for the player character and set it to the variable playerImage
const playerImage = new Image()
// set the source of the player image to the given path
playerImage.src = './Images/Run.png'

// create a class Sprite to define a sprite in the game
class Sprite {
    // in the constructor, set the position, velocity, and image properties
    constructor({
        position,
        velocity,
        image,
        frames = {max: 1}
    }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
    }
    
    update() {
        if (this.frames.val < this.frames.max - 1) {
            this.frames.val++
        } else {
            this.frames.val = 0
        }
    }


    draw() {
        let frame = 0
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.width,
            this.height,
            this.position.x,
            this.position.y,
            this.width * 0.9,// the cropping of the canvas
            this.height
        );

        if (this.moving) {
            if (this.frames.max > 8) {
                this.frames.elapsed++
            }
        }
        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max) this.frames.val++;
            else this.frames.val = 0
        }
    }
}



// create an new instance of the Sprite class for the background and set it to the variable background
const background = new Sprite({
    position: {
        x: 0,
        y: -120,
    },
    image: image
})

// create an new instance of the Sprite class for the player and set it to the variable player
const player = new Sprite({
    position: {
        x: canvas.width / 3 - playerImage.width / 2,
        y: canvas.height / 2 - playerImage.height / 2,
    },
    image: playerImage,
    frames: {max: 7}
})

const keys = {
    a: {
        pressed: false
    }, 

    d: {
        pressed: false
    }, 

    ArrowLeft: {
        pressed: false
    }, 

    ArrowRight: {
        pressed: false
    }, 


}

// function to animate the sprite
function animate() {
    // request animation frame for the window to update the animation
    window.requestAnimationFrame(animate)
    // log a message to the console for debugging purposes
    console.log('animate')
    // call the draw method on the background sprite
    background.draw()
    player.update()
    player.draw()
    
    if (keys.d.pressed && lastKey === 'd') {
        if (background.position.x > -canvas.width / 2) {
            background.position.x = background.position.x -=2
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        if (background.position.x < 0) {
            background.position.x = background.position.x += 2
        }
    }
}



// call the animate function to start the animation
animate()


// add the animation to the sprite run animation

// Key functions
let lastKey = ''
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break

        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            lastKey = 'ArrowLeft'
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            lastKey = 'ArrowRight'
            break
    }
    console.log(keys);
})

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = false;
            break

        case 'd':
            keys.d.pressed = false;
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
    }
    console.log(keys);
})