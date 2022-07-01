var playing=false;
var score;
var action;
var timeRemaining;
var correctAnswer;

document.getElementById("startreset").onclick=function(){  //if we click on start/reset 
    if(playing==true){ //if we are playing
        location.reload();//reload the page
    }else{ //if we are not playing
        playing=true;
        score=0; //set score to 0
        document.getElementById("scorevalue").innerHTML=score;
        show("timeremaining"); //show countdown box
        timeRemaining=60;
        document.getElementById("timeremainingvalue").innerHTML=timeRemaining;
        hide("gameover"); //hide game over box
        document.getElementById("startreset").innerHTML="Reset Game";  //change button to reset

        startCountdown(); //start countdown

        //generate a new Q&A
        generateQA();

    }
}
//clicking on ananswer box
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick=function(){
        if(playing==true){//check if we are playing
            if(this.innerHTML==correctAnswer){ //corect answer
                score++;
                document.getElementById("scorevalue").innerHTML=score; //increase score by 1
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
    
                generateQA(); //generete new Q&A
            }else{ //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }
    }
}

//start counter
function startCountdown(){
    action=setInterval(function(){
        timeRemaining-=1;
        if(timeRemaining==0){//game over
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML="<p>Game Over</p><p>Your score is "+score+"</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML="Start Game";
        }
        document.getElementById("timeremainingvalue").innerHTML=timeRemaining;
    },1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hides an element
function hide(Id){
    document.getElementById(Id).style.display="none";
}

//shows as element
function show(Id){
    document.getElementById(Id).style.display="block";
}

//generate questions and multiple answers
function generateQA(){
    var x=1+Math.round(8*Math.random());
    var y=1+Math.round(8*Math.random());
    correctAnswer=x*y;
    document.getElementById("question").innerHTML=x+"x"+y;
    var correctPosition=1+Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer; //fill one box with the correct answer
    var answers=[correctAnswer];
    for(i=1;i<5;i++){ //fill other boxes with wrong answers
        if(i!=correctPosition){
            var wrongAnswer;
            do{wrongAnswer=(1+Math.round(8*Math.random()))*(1+Math.round(8*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
        
            document.getElementById("box"+i).innerHTML=wrongAnswer;

            answers.push(wrongAnswer); //add new wrong answer to array
        }
    }
}