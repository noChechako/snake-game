let div = document.createElement('div');
let button= document.createElement('button');
let snakeBody =[];
let interval;
let thing;
var direction = 'down';
document.body.appendChild(div);
button.innerHTML='Start';
document.body.appendChild(button);
button.addEventListener('click', startGame);

function startGame(){
        generateSnake();
        interval = setInterval(move,300);
}

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        let excel = document.createElement('div');
        div.appendChild(excel);
        excel.classList.add('excel');
        excel.setAttribute('posX', row + 1);
        excel.setAttribute('posY', col + 1);
    }
}
function generateSnake(){
    let posX = Math.round(Math.random() * (10 - 1) + 1)
    let posY = Math.round(Math.random() * (10 - 3) + 3)
    // return [posX, posY];
    let coordinates = [posX, posY];
    snakeBody = [document.querySelector('[posX = "' + (coordinates[0]) + '"][posY = "'
    + (coordinates[1]-2) + '"]'), document.querySelector('[posX = "' + (coordinates[0]) + '"][posY = "'
            + (coordinates[1]-1) + '"]'), document.querySelector('[posX = "' + (coordinates[0] ) + '"][posY = "'
                + (coordinates[1]) + '"]')];
    snakeBody[0].classList.add('head');
  
    

    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('body');
    }
    createThing();
}

function createThing() {
        let posX = Math.round(Math.random() * (10 - 1) + 1);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
       thing = document.querySelector('[posX="' + posX + '"][posY="' + posY + '"]');
       if(thing.classList.contains('body')){

           createThing();
       }
      thing.classList.add('food');

}


function move() {
    snakeBody[0].classList.remove('head');

    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    console.log(snakeCoordinates[0]+ '  '+ snakeCoordinates[1])
    snakeBody[snakeBody.length - 1].classList.remove('body')
    snakeBody.pop();
    if (direction == 'right') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] ) + '"][posY = "'
                + (+snakeCoordinates[1]+1) + '"]'))
            
        }
        else snakeBody.unshift(document.querySelector('[posX = "'+snakeCoordinates[0]+'"][posY = "1"]'))
    }
    if (direction == 'left') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] ) + '"][posY = "'
                + (snakeCoordinates[1]-1) + '"]'))
        }
        else snakeBody.unshift(document.querySelector('[posX = "'+snakeCoordinates[0]+'"][posY = "'
            + 10 + '"]'))
    }
    if (direction == 'up') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (snakeCoordinates[0]-1) + '"][posY = "'
                + snakeCoordinates[1]  + '"]'))
        }
        else
            snakeBody.unshift(document.querySelector('[posX = "' +10 + '"][posY = "'+snakeCoordinates[1]+'"]'))

    }
    if (direction == 'down') {
        if (snakeCoordinates[0] <10 ) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+1) + '"][posY = "'
                + snakeCoordinates[1]  + '"]'))
        }
        else
            snakeBody.unshift(document.querySelector('[posX = "' + 1 + '"][posY = "'+snakeCoordinates[1]+'"]'))
    }
    if(snakeBody[0].classList.contains('body')){
        alert("Конец игры! Вы набрали: "+ snakeBody.length )
        clearInterval(interval);
    }
      
    snakeBody[0].classList.add('head');
    if (snakeBody[0].getAttribute('posX') == thing.getAttribute('posX') &&
        snakeBody[0].getAttribute('posY') == thing.getAttribute('posY')) {
        thing.classList.remove('food');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX')
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY')
        snakeBody.push(document.querySelector('[posX="' + a + '"][posY="' + b + '"]'))
        snakeBody[snakeBody.length - 1].classList.add('body');

        createThing();
    }


    snakeBody[0].classList.add('body');

    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('body');
    }

}

window.addEventListener('keydown', function (event) {
    console.log(event.key)
    if (event.key == 'ArrowLeft' && direction != 'right') {
        direction = 'left';   
      


    }
    if (event.key == 'ArrowUp' && direction != 'down') {
        direction = 'up';    
     

    }
    if (event.key == 'ArrowRight' && direction != 'left') {
        direction = 'right';     
     

    }
    if (event.key == 'ArrowDown' && direction != 'up') {
        direction = 'down';
        

    }
})




