class Final{
    constructor(correctAnswers, totalAmount){
        this.scoreElement = document.querySelector(".score");
        this.againBtn = document.querySelector("#again");
        this.render(correctAnswers,totalAmount);
        this.againBtn.addEventListener("click", this.startAgain);
    }

    render = (correctAnswers, totalAmount)=>{
        this.scoreElement.innerHTML = `You answered (${correctAnswers}) from (${totalAmount}) correct`;
    }
    
    startAgain = ()=>{
        location.reload();
    }
}

export default Final;