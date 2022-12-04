// var myCanvas = document.getElementById("myCanvas");
// var ctx = myCanvas.getContext("2d");


// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 200, 200)

var c = document.getElementById("myTextCanvas");
var ctx = c.getContext("2d");
ctx.font = "20px Verdana";
var gen = Math.ceil(Math.random() * 7);
var pog = 0
ctx.fillText("Generirane: " + gen + "\nPogođene: " + pog, 10, 30);


var myGamePiece = [];

function startGame() {
    for (i = 0; i < gen; i++) {
        var speed = Math.ceil(Math.random() * 7)
        myGamePiece[i] = new component(40, 40, "red", Math.ceil(Math.random() * 760), Math.ceil(Math.random() * 760),
            speed);
    }
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.id = "myGameCanvas";
        this.canvas.width = 800// 480;
        this.canvas.height = 800// 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, speed, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed_x = speed;
    this.speed_y = speed;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
        var speed = Math.ceil(Math.random() * 7)
        if (this.x - this.width / 2 < 0)
        this.speed_x = speed;
        else if ((this.x + this.width / 2) >= myGameArea.context.canvas.width)
        this.speed_x = -speed;
        if (this.y - this.height / 2 < 0)
        this.speed_y = -speed;
        else if ((this.y + this.height / 2) >= myGameArea.context.canvas.height)
        this.speed_y = speed;
        this.x += this.speed_x;
        this.y -= this.speed_y;
    }
}

function updateGameArea() {
    myGameArea.clear();
    for (i = 0; i < gen; i++) {
        myGamePiece[i].newPos();
        myGamePiece[i].update();
    }
}