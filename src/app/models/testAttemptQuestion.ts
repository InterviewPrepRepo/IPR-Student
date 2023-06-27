export default interface TestAttemptQuestion {
    question : string,
    score : number,
    questionStatus : string
    candidateAnswer: {
      videoAnswer: {
        videoUrl: string
      }, 
      singleAnswer: {
        answers: string,
        answerId: number
      },
      codingQuestionData: {
        candidateCode: string
      },
      multipleAnswer: {
        answers: string [],
        answerId: number []
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
    questionTypeId: number
  }

 