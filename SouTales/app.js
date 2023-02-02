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
const backgroundImage = new Image()
backgroundImage.src = './Images/Level1 Grass plane.png'
console.log(backgroundImage)

backgroundImage.onload = () => {
    c.drawImage(backgroundImage, 0, 0)
}

const playerImage = new Image()
playerImage.src = './Images/Run.png'

class Sprite {
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
            this.width = this.image.width
            this.height = this.image.height
        }
        this.moving = false
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
            this.width * 1,
            this.height
        );
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: -120,
    },
    image: backgroundImage
})

const keys = {
    a: {
        pressed: false
    }, 

    d: {
        pressed: false
    }, 
}

function animate() {
    window.requestAnimationFrame(animate)
    console.log('animate')
    background.draw()
    
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

animate()

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
    }
});

// move the sprite
// move the sprite
const sprite = document.querySelector(".sprite");

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyD") {
    sprite.style.left = `${parseInt(sprite.style.left) + 10}px`;
    sprite.style.animation = "sprite-animation 1s steps(7) infinite";
  } else if (event.code === "KeyA") {
    sprite.style.left = `${parseInt(sprite.style.left) - 10}px`;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "KeyD") {
    sprite.style.animation = "";
  }
});
