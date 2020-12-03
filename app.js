

//? Game values

let min = 1,
    max = 10,
    winningNum = getwinningnum(min,max),
    guessesLeft = 3,
    msgtimer;

    
const UIgame    = document.querySelector("#game"),
      UImin     = document.querySelector('.min-num'),      
      UImax     = document.querySelector('.max-num'),      
      UIinput   = document.querySelector('#guess-input'),      
      UIsubmit  = document.querySelector('#guess-btn'),      
      UImessage = document.querySelector('.message'),      
      UIeasy    = document.querySelector(".easy"),  
      UImedium    = document.querySelector(".medium"),  
      UIhard    = document.querySelector(".hard"),
      UIhint    = document.querySelector(".hint");
      
      UImin.textContent = min;      
      UImax.textContent = max;  

    UIgame.addEventListener("mousedown",(e)=>{

        if(e.target.classList.contains("play-again")){
            window.location.reload();
        }
    });

    UIgame.addEventListener("click",(e)=>{
        if(e.target.classList.contains("easy")){
            min = 1;
            max = 10;
            UIeasy.classList.remove("button-primary");
            UImedium.classList.remove("button-primary");
            UIhard.classList.remove("button-primary");
            UIeasy.classList.add("button-primary");
            UImin.textContent = min;      
            UImax.textContent = max;  
            winningNum = getwinningnum(min,max);
            guessesLeft = 3;  
        }
        if(e.target.classList.contains("medium")){
            min = 1;
            max = 20;
            UIeasy.classList.remove("button-primary");
            UImedium.classList.remove("button-primary");
            UIhard.classList.remove("button-primary");
            UImedium.classList.add("button-primary");
            UImin.textContent = min;      
            UImax.textContent = max;    
            winningNum = getwinningnum(min,max);
            guessesLeft = 5;
        }
        if(e.target.classList.contains("hard")){
            min = 1;
            max = 30;
            UIeasy.classList.remove("button-primary");
            UImedium.classList.remove("button-primary");
            UIhard.classList.remove("button-primary");
            UIhard.classList.add("button-primary");
            UImin.textContent = min;      
            UImax.textContent = max;    
            winningNum = getwinningnum(min,max);
            guessesLeft = 10;
        }
    })

    
UIinput.style.borderColor = "black";
UIsubmit.addEventListener("click",()=>{
    let guess = parseInt(UIinput.value);

    if( isNaN(guess) || guess < min || guess > max){
        UIinput.style.borderColor = "red";
        return setMessage(`please enter a value between ${min} and ${max}`,'red');
        
    }

    if(guess == winningNum){
        gameover(true,`Well done !! ${guess} is the correct number`);
           
    }else{
        guessesLeft -= 1;
        if(guessesLeft == 0){
            gameover(false,`Game Over ! ${guess} is the wrong number , the correct answer is ${winningNum}`);
            clearInterval(msgtimer);
            UIhint.textContent = '';
        }else{
            UIinput.style.borderColor = "red";
            UIinput.value ="";
            setMessage(`${guess} is the wrong number , you have ${guessesLeft} guesses left`,'red');
        }
       
    }
    if (guess < winningNum) {
        UIhint.textContent = 'You have gone low! Guess a higher value!';
        
     } if (guess > winningNum) {
            UIhint.textContent = 'You have gone high! Guess a low value!';

     } if (guess === winningNum) {
            UIhint.textContent = '';
     } 
})


function getwinningnum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function setMessage(msg,color){
    UImessage.style.color = color
    UImessage.textContent = msg;  
}


function gameover(won,msg){
    let color;
    won == true ? color ="green" : color = "red";
    UIinput.disabled = true;
    UIinput.style.borderColor = color;
    setMessage(msg,color);

    UIsubmit.value = "Play Again";
    UIsubmit.classList.add("play-again");
}