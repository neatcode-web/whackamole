const numOfHoles = 5;
let holes;
const scoreBoard = document.querySelector('#score');
let lastHole;
let gameOver = false;
let score = 0;

function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const hole = randomHole(holes);
    hole.classList.add('active');
    setTimeout(() => {
        hole.classList.remove('active');
        if(!gameOver) {
            peep();
        }
    }, 1000);
}

function wack(e){
    if(!e.isTrusted) return;
    if(e.target.classList.contains('active')) {
        score ++;
    } else {
        score --;
    }
    this.parentNode.classList.remove('active');
    scoreBoard.textContent = score;
    if(score === 5) {
        stopGame();
    }
}
function stopGame() {
    gameOver = true;
    document.querySelector('.game-result').textContent = "You win!";
    holes.forEach(hole => hole.removeEventListener('click', wack));
}
function startGame() {
    scoreBoard.textContent = 0;
    document.querySelector('.game-result').textContent = "";
    gameOver = false;
    score = 0;
    holes.forEach(hole => hole.addEventListener('click', wack));
    peep();
}

function createHole() {
    let hole = document.createElement('div');
    hole.className = 'hole';
    return hole;
}

window.onload = function() {
    for(let i = 0; i < numOfHoles; i ++) {
        document.querySelector('.hole-container').appendChild(createHole())
    }
    holes = document.querySelectorAll('.hole');
}