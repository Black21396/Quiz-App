import Final from "./final.js";
import Question from "./question.js";
class Quiz{
    constructor(quizElement, amount, questions){
        // get all the HTML elements for quiz to fill it with the data (Questions and answers) 
        this.quizElement = quizElement;
        this.currentElement = document.querySelector(".current");
        this.totalElement = document.querySelector(".total");
        this.finalElement = document.querySelector(".final");
        this.nextBtn = document.querySelector("#next");
        this.nextBtn.addEventListener("click",this.nextQuestion);
        this.totalAmount = amount;

        //index of current question, because all quewstion in array, the first question in index 0
        this.answeredAmount = 0;
        
        //this question from API come as String so we have to make every question as "Question"
        //object to create new Property and calculate the right and false question, etc...
        // we make Question class you can see it 
        this.questions = this.setQuestions(questions);

        //show first question
        this.renderQuestion();
    }

    // method to make every question from API as Question object
    setQuestions = (questions)=>{
        questions = questions.map((el)=>{
             return new Question(el);
        });
        return questions;
    }

    // method to fill the HTML elements with data (questions and answers)
    renderQuestion = ()=> {
        
        // draw first question (has index 0 (answeredAmount)) on screen
        // every question object has the "render" method to draw the question on the page 
        this.questions[this.answeredAmount].render();
        
        // show the number of current question to the user
        this.currentElement.innerHTML = this.answeredAmount + 1;
        // show the number of all question in this question to the user
        this.totalElement.innerHTML = this.totalAmount;
    }

    // method plays when user click to next question
    nextQuestion = ()=>{
        // get the answer of the current question, which user selected it
        const checkElement = this.questions[this.answeredAmount]
                            .answerElements.filter((el)=>el.firstChild.checked);
        
        // if user click next question but he doesnt answerd the correct question
        if(checkElement.length == 0){
            alert("Firstly you have to answer the current question");
        }
        // if user select the answer and he wants to move to the next question
        else{
            // check the answer of the user (true or false)
            this.questions[this.answeredAmount].answer(checkElement);
            // move to the next question
            this.answeredAmount++;

            // check if this question is the last question or not
            // if this question is not the last question (go to next question)
            // if this is the last question then show the final result
            this.answeredAmount < this.totalAmount? this.renderQuestion():this.endQuizApp();


        }
    }

    // if the quiz is end: hide the quiz html elements and show the result to the user
    endQuizApp = ()=>{
        this.quizElement.style.display = "none";
        this.finalElement.style.display = "block";
        const correct = this.countCorrectAnswers();
        new Final(correct,this.totalAmount);
    }

    // method to count how many right answer user select
    countCorrectAnswers = ()=>{
        let count = 0;
        this.questions.forEach(el=> {
            if(el.isCorrect == true){
                count++;
            }
        });
        return count;
    }
}

export default Quiz;