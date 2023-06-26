export default interface TestAttemptQuestion {
    question : string,
    score : number,
    questionStatus : string
    candidateAnswer: {
      videoAnswer: {
        videoUrl: string
      }, 
      codingQuestionData: {
        candidateCode: string
      }
    }
    correctAnswer: string
    givenAnswer: string
    sectionName: string
    sectionId: number
    testName: string
    testInvitationId: number
    testId: number
    points: number
  }