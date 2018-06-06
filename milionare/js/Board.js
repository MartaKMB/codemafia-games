class Board {
    constructor(questions) {
        this.questions = questions
        this.currentQuestionIndex = 0
        this.currentQuestion = this.getCurrentQuestion()
        
        this.questionCard = document.getElementById('question-card')
        this.questionList = document.getElementById('question-list')
    }
    
    getCurrentQuestion() {
        const question = this.questions[this.currentQuestionIndex]
        return new Question(question)
    }
    
    renderQeuestionCard() {
        this.questionCard.innerText = ''
        const questionElement = document.createElement("h2")
        questionElement.innerText = this.currentQuestion.text
        
        this.questionCard.appendChild(questionElement)
        
        const answerListElement = this.getAnswerListElement()
        this.questionCard.appendChild(answerListElement)
    
    }
    
    renderQuestionList() {
        this.questionList.innerText = ""
        const listElement = document.createElement('ul')
        this.questions.forEach((question, idx) => {
            const itemElement = document.createElement('li')
            itemElement.innerText = `Question ${idx + 1}\nQuestion worth $${(idx + 1) * 100}`
            
            if(idx === this.currentQuestionIndex) {
                itemElement.classList.add('current')    
            }
            
            if(idx < this.currentQuestionIndex) {
                itemElement.classList.add('past') 
            }
            
            listElement.appendChild(itemElement)
        })
        
        this.questionList.appendChild(listElement)
    }
    
    getAnswerListElement() {
        const answersListElement = document.createElement('ul')

        const answers = this.currentQuestion.getAnswers()
        
        answers.forEach(answer => {
            const answerElement = document.createElement('li')
            const answerButton = this.getAnswerButton(answer)
            
            answerElement.appendChild(answerButton)
            answersListElement.appendChild(answerElement)
        })
    }
    
    setNextQuestion() {
        this.currentQuestionIndex++
        this.currentQuestion = this.getCurrentQuestion()
        this.getAnswerListElement()
    }
    
    getAnswerButton(answer) {
        const answerButton = document.createElement('button') 
        
        answerButton.innerText = answer    
        answerButton.addEventListener("click", () => {
            const isAnswerCorrect = this.currentQuestion.answer(answer)
            if(isAnswerCorrect) {
                this.setNextQuestion()
                this.renderQeuestionCard()
            }
        })
    }
}

