class Question{
    constructor(question){
        // get the question html elements to fill it with the question data(which it come from API) 
        this.questionElement = document.querySelector("#question");
        this.answerElements = [
            document.querySelector("#a1"),
            document.querySelector("#a2"),
            document.querySelector("#a3"),
            document.querySelector("#a4")
        ];

        // add private preoperty to know if user answerd right (this property come from API question)
        this.correctAnswer = question.correct_answer;
        this.question = question.question;
        // the inital value that user answered false
        this.isCorrect = false;
        
        // gather all the answers for the question (4 answers) one answer is right and the other is false
        this.answers = [question.correctAnswer, ...question.incorrect_answers];
    }

    // method to check the user answer
    answer = (checkElement)=>{
        // I compare always the user answer with the first answer because I put the 
        // right answer always in the index 0 (I make the in the constructor of Question (show above)) 
        this.isCorrect = checkElement[0].textContent == this.correctAnswer? true:false;
    }

    // method to draw the answer (by fill HTML elements) on the screen
    render = ()=>{
        this.questionElement.innerHTML = this.question;
        this.answerElements.forEach((el,index)=>{
            el.innerHTML = `<input type="radio" name=radio> ${this.answers[index]}`;
        });
    }
}

export default Question;