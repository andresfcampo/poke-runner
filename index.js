const canvas = document.querySelector(".myCanvas")
const ctx = canvas.getContext("2d");



const img = new Image()
img.src = "./Imagebackground.jpeg"
const charmanderImg = new Image()
charmanderImg.src = "./Charmander.png"


/*
img.onload = () => {
    ctx.drawImage (img, 0, 0, canvas.width, canvas.height)
}
*/

class Pokemon {
    constructor (x,y,img) {
        this.x = x 
        this.y = y
        this.img = img
        this.w = 150
        this.h = 130
    }
    draw () {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)

    }
} 

const charmander = new Pokemon (50, 300, charmanderImg)


setInterval ( () => {
    ctx.clearRect (0,0,canvas.width, canvas.height)
    ctx.drawImage (img, 0, 0, canvas.width, canvas.height)
    charmander.draw()
}, 20)


