export default interface TestAttemptQuestion {
    question : string,
    score : number,
    questionStatus : string
    candidateAnswer: {
      videoAnswer: {
        videoUrl: string
      }
    }   
  }