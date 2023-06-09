let fields = [];
let gameOver = false ;
let currentShape = 'cross';
let counter = 0 ;

function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'cross') {
            currentShape = 'circle';
            activatePlayer('player1');
        } else {
            currentShape = 'cross';
            activatePlayer('player2');   
        }
        fields[id] = currentShape;
        draw();
        checkForWin();
    }
}

function activatePlayer(player){
    if (player == 'player1') {
        document.getElementById('player-2').classList.remove('player-inactive');
        document.getElementById('player-1').classList.add('player-inactive');
    } else if (player == 'player2') {
        document.getElementById('player-1').classList.remove('player-inactive');
        document.getElementById('player-2').classList.add('player-inactive');
    }
}

function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById(`circle-${i}`).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById(`cross-${i}`).classList.remove('d-none');
        }
    }
}

function restart() {
    gameOver = false ;
    fields = [] ;
    currentShape = 'cross' ;
    counter = 0 ;
    resetIcons() ;
    for (let i = 0; i < 8; i++) {
        const number = i;
        document.getElementById(`line-${number}`).style.transform = 'scaleX(0.0)' ;
    }
    for (let i = 0; i < 9; i++) {
        const number = i;
        document.getElementById(`circle-${number}`).classList.add('d-none') ;
        document.getElementById(`cross-${number}`).classList.add('d-none') ;
    }
}

function resetIcons() {
    document.getElementById('player-2').classList.add('player-inactive');
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('game-over').classList.add('d-none') ;
    document.getElementById('restart-button').classList.add('d-none') ;
}

function checkForWin() {
    counter++ ;
    if ((checkFromLine0To2() || checkFromLine3To5() || checkFromLine6To7()) || (counter == 9 && gameOver == false)) {
        gameOver = true ;
        //verzögert ausführen
        setTimeout(function(){
            document.getElementById('game-over').classList.remove('d-none') ;
            document.getElementById('restart-button').classList.remove('d-none') ;
        },1000) ;
    }
    
}

function checkFromLine0To2() {
    let winner;
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-0').style.transform = 'scaleX(1.0)' ;
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-1').style.transform = 'scaleX(1.0)' ;
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-2').style.transform = 'scaleX(1.0)' ;
    }
    return winner ;
}

function checkFromLine3To5() {
    let winner;
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-3').style.transform = 'rotate(90deg) scaleX(1.0)' ;
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1.0)' ;
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1.0)' ;
    }
    return winner ;
}

function checkFromLine6To7() {
    let winner;
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-6').style.transform = 'rotate(45deg) scaleX(1.2)' ;
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-7').style.transform = 'rotate(-45deg) scaleX(1.2)' ;
    }
    return winner ;
}