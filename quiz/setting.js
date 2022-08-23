import "./quiz.js";
import Quiz from "./quiz.js";
class settings{
    constructor(){
        // define alle element in index.html to know which options select the user
        this.settingsDom = document.querySelector(".settings");
        this.quizDom = document.querySelector(".quiz");
        this.categoryDom = document.querySelector("#category");
        this.nQuestions = document.querySelector("#nQuestions");
        this.startBtn = document.querySelector("#startBtn");
        this.difficulty = [
            document.querySelector("#easy"),
            document.querySelector("#medium"),
            document.querySelector("#hard")
        ];

        // properity to create new Quiz when we take all the user settings and get the questions from API
        this.quiz = {};

        // When the user click star quiz, firstly check the validation user input then begin the Quiz
        this.startBtn.addEventListener("click",this.startQuizApp);
    }

    // take all selcted options from user and make the URL to get the Questions from Tha Server
    startQuizApp = async()=>{
        
        try{
            const amount = this.getAmount();
            const category = this.categoryDom.value;
            const difficulty = this.getDifficulty();
            // make the URL with the user preferrence and get the question
            const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
           
            // we have to wait the response from the server so we put the 'await' keywords
            let {results} = await this.fetchData(url);

           // after take the user Preferrence and get the Question create new instance from quiz to begin the quiz
            this.quiz = new Quiz(this.quizDom, amount, results);

            this.toggleElements();
            

        }catch(e){
            console.log(e);
        }

       
    }

    // after the user select the quiz option and click start quiz we hide the options and show the quiz
    toggleElements = ()=>{
        this.settingsDom.style.display = "none";
        this.quizDom.style.display = "block";
    }

    // function to get Resonse from Server
    fetchData = async(url)=> {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    
    }

    // function to know which level select the user (easy, medium, hard)
    getDifficulty = ()=>{
        const difficulty = this.difficulty.filter(el=> el.checked);
        if(difficulty.length == 1){
            return difficulty[0].id;
        }
        else{
            alert("Please select difficult");
        }
        
    }

    // function to know ho many questions select the user
    getAmount = ()=>{
        if(this.nQuestions.value > 0 && this.nQuestions.value < 50){
            return this.nQuestions.value;
        }
        alert("Please input valid 'number of Questions' between 1 and 50");
    }
}

// we export the class to can use it in another Javascript file by using keyword 'export default'
export default settings;