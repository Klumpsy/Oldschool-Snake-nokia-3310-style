document.addEventListener('DOMContentLoaded', () => { 
    const squares = document.querySelectorAll('.snakeGrid div'); 
    const scoreDisplay = document.querySelector('.score span'); 
    const startButton = document.querySelector(".start"); 

    const width = 10; 
    let currentIndex = 0; //Eerste div in grid 
    let foodIndex = 0; //Eerste div in grid
    let currentSnake = [2,1,0] // 2 is de kop van de slang en 0 is de staart en lichaamsdelen zijn 1;  
    let direction = 1; 
    let score = 0; 
    let speed = 0.9; 
    let intervalTime = 0; 
    let interval = 0; 

    //spel starten en herstarten 
    function startGame() { 
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[foodIndex].classList.remove('food'); 
        clearInterval(interval); 
        score = 0; 
        scoreDisplay.innerText = score; 
        randomFood();
        intervalTime = 1000; 
        currentSnake = [2,1,0]; 
        currentIndex = 0; 
        currentSnake.forEach(index => squares[index].classList.add('snake')); 
        interval = setInterval(moveOutcomes, intervalTime); 
    };

    //function die alles regelt wat met de slang te maken heeft 
    function moveOutcomes() { 
        if ( 
            (currentSnake[0] + width >= (width * width) && direction === width) || 
            (currentSnake[0] % width === width -1 && direction === 1) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < 0 && direction === -width) ||
            squares[currentSnake[0] + direction].classList.contains('snake') 
        ) { 
            alert("Verloren, helaas probeer het opnieuw!");
            location.reload();
            return clearInterval(interval)
            
        } 
        
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)

        if(squares[currentSnake[0]].classList.contains('food')) {
            squares[currentSnake[0]].classList.remove('food')
            squares[tail].classList.add('snake'); 
            currentSnake.push(tail); 
            randomFood();
            score++
            scoreDisplay.textContent = score; 
            clearInterval(interval)
            intervalTime = intervalTime * speed 
            interval = setInterval(moveOutcomes, intervalTime); 
        }
        squares[currentSnake[0]].classList.add('snake'); 
    };

    //generate random food
    function randomFood() { 
     do{
         foodIndex = Math.floor(Math.random() * squares.length)
     }  while(squares[foodIndex].classList.contains('snake')) 
     squares[foodIndex].classList.add('food'); 
    }

    
    //acties op knoppen keyboard zetten 
    function control (e) { 
       squares[currentIndex].classList.remove('snake'); //verwijder de class snake uit div
       
       if(e.keyCode === 39) { 
           direction = 1;  //slang gaat naar rechts 
       } else if (e.keyCode === 38) { 
           direction = -width; //slang gaat 10 divs terug zoda thet lijkt dat de slang omhoog gaat. 
       } else if (e.keyCode === 37) { 
           direction = -1; //slang gaat 1 div naar links
       } else if (e.keyCode === 40) {
           direction = +width; //slang gaat 1 div naar beneden;
       }
    }

document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);


});

