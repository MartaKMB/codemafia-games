class Question {
    constructor(data) {
        this.data = data
        this.text = data.question
    }
    
    answer(answer) {
        if(this.data.correct_answer === answer) {
            console.log('poprawna odpowiedź')
            return true
        } else {
            console.log('zła odpowiedź')
            return false
        }
    }
    
    getAnswers() {
        const answers = [...this.data.incorrect_answers, this.data.correct_answer]
        const shuffledAnswers = aswers
            .map(a => [Math.random(), a])
            .sort((a,b) => a[0] - b[0])
            .map(a => a[1])
        return shuffledAnswers
    }
}