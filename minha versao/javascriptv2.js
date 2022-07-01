var action;
var correctAnswer;
document.getElementById("gameover").innerHTML="<br/><p>Maths Game!</p>";
show("gameover");
document.getElementById("startbutton").onclick=function(){  //if  click on start
    hide("startbutton");
    hide("gameover");    
    var score=0;
    show("score");
    show("question");
    show("choices");
    show("instruction");
    var timeRemaining=60;
    document.getElementById("timeremainingvalue").innerHTML=timeRemaining;
    show("timeremaining");//show countdown box
    generateQA();
    action=setInterval(function(){ //start countdown
        timeRemaining-=1;
        if(timeRemaining==0){//game over
            clearInterval(action); //stop counter
            document.getElementById("gameover").innerHTML="<p>Game Over</p><p>Your score is "+score+"!</p>";
            show("gameover");
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            show("startbutton");
            hide("question");
            hide("choices");
            hide("instruction");
            hide("score");
        }
        document.getElementById("timeremainingvalue").innerHTML=timeRemaining; //update timer
        document.getElementById("scorevalue").innerHTML=score; //update score
        
        for(i=1;i<5;i++){
            document.getElementById("box"+i).onclick=function(){
                if(this.innerHTML==correctAnswer){ //corect answer
                    score++;//increase score
                    show("correct");
                    setTimeout(function(){
                        hide("correct");
                    },2000);
                }else{ //wrong answer
                    score--;//decrease score
                    show("wrong");
                    setTimeout(function(){
                        hide("wrong");
                    },2000);                    
                }
                generateQA(); //generete new Q&A
            }   
        }
    },1000);
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
