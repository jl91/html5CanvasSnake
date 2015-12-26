(function () {
    var c = document.getElementById('myCanvas');

    var offsetHeight = c.offsetHeight;
    var offsetWidth = c.offsetWidth;
    var ctx = c.getContext('2d');
    ctx.fillStyle = "#ff0000";
    var width = 20;
    var height = 20;
    var x = 0;
    var y = 0;
    var oldX = x;
    var oldY = y;
    var score = 0;
    var currentDirection = {'direction': ''};
    var movementLoop;
    var movementSpeed = 300;

    var dx = 20; //a tava de variação (velocidade) horizontal do objeto
    var dy = 20; //a tava de variação (velocidade) vertical do objeto
    ctx.fillRect(x, y, width, height);

    ///making apples
    var apple = c.getContext('2d');
    apple.strokeStyle = 'black';
    appleXPos = getRandomInt();
    appleYPos = getRandomInt();

    drawApple();
    gameLoop = setInterval(drawApple, 5000);

    function getRandomInt() {
        var number = Math.round(Math.random() * (580 - 20) + 20);
        while (number % 20 !== 0) {
            number = getRandomInt();
        }
        return number;

    }

    function drawApple() {
        if (x !== appleXPos && x !== appleXPos + 20 && y !== appleYPos && y !== appleYPos + 20) {

            apple.beginPath();
            apple.fillStyle = "#9ACD32";
            apple.clearRect(appleXPos, appleYPos, 20, 20);
            appleXPos = getRandomInt();
            appleYPos = getRandomInt();
            apple.strokeStyle = 'black';
            apple.fillRect(appleXPos, appleYPos, 20, 20);
            apple.fill();
        } else {
            appleXPos = getRandomInt();
            appleYPos = getRandomInt();
            drawApple();
        }
    }

    function checkCollision() {

        if (x == appleXPos && y == appleYPos)
        {
            score += 100;
            clearInterval(gameLoop);
            drawApple();
            gameLoop = setInterval(drawApple, 5000);
            document.getElementById('myScore').value = score;
        }
    }

    function draw() {
        ctx.beginPath();
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(x, y, width, height);
        ctx.fill();
    }

    function clear() {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.clearRect(oldX, oldY, width, height);
        ctx.fillRect(x, y, width, height);
        ctx.closePath();
        ctx.fill();
    }

    function update() {
        clear();
        draw();
        checkCollision();   

    }

    Object.observe(currentDirection, function (current) {

        var direction = current[0].object.direction;
        if (movementLoop) {
            clearInterval(movementLoop);
        }

        switch (direction) {
            case 'top' :

                if (y - dy > 0) {
                    movementLoop = setInterval(function () {
                        y -= dy;
                        clear();
                        update();
                    }, movementSpeed);
                } else {
                    alert('game over');
                }
                break;
                
            case 'right':
                if (x + dx < 600) {
                    movementLoop = setInterval(function () {
                        x += dx;
                        clear();
                        update();
                    }, movementSpeed);
                } else {
                    alert('Game over');
                }
                break;
                
            case 'bottom' :
                if (y + dy < 600) {
                    movementLoop = setInterval(function () {
                        y += dy;
                        clear();
                        update();
                    }, movementSpeed);
                } else {
                    alert('Game over');
                }
                break;
                
            case 'left' :
                if (x - dx > 0) {
                    movementLoop = setInterval(function () {
                        x -= dx;
                        clear();
                        update();
                    }, movementSpeed);
                } else {
                    alert('game over');
                }
                break;
        }
    });

    function keyDown(key) {
        key.preventDefault();
        oldX = x;
        oldY = y;
        switch (key.keyCode) {
            case 38:  /*seta para cima */
                currentDirection.direction = 'top';
                break;

            case 40:  /*set para baixo*/
                currentDirection.direction = 'bottom';
                break;

            case 37:  /*set para esquerda*/
                currentDirection.direction = 'left';
                break;

            case 39:  /*seta para direita*/
                currentDirection.direction = 'right';
                break;
        }

    }

    document.addEventListener('keydown', keyDown, true);
    setInterval(update, 16);

})();

/////////////////////////