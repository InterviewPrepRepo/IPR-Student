export default interface TestInvitation {
    testId : number,
    testInvitationId : number,
    name : string,
    email : string,
    teststatus: string,
    score? : number,
    average?: number
}