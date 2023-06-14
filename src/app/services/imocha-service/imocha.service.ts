import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import TestInvitation from 'src/app/models/testInvitation';
import TestAttemptQuestion from 'src/app/models/testAttemptQuestion';
import VideoTest from 'src/app/models/videoTest';
import { UtilService } from '../util-service/util.service';

@Injectable({
  providedIn: 'root'
})
export class ImochaService {
  private baseurl: string = environment.APIBaseURL + 'imocha/';

  constructor(private http: HttpClient, private util: UtilService) { }

  organizedTestAttempts: Record<number, TestInvitation[]> = {};
  tests : VideoTest[] = [];

  private urlBuilder(urlSegment: string) {
    return this.baseurl + urlSegment;
  }

  //Invites candidate through iMocha api. TestId, name, and email are required 
  inviteCandidate(testId: number, name: string, email: string): Observable<any> {
    return this.http.post<any>(this.urlBuilder('invite'), { testId, email, name });
  }

  //Asks Imocha api for a new testAttemptId to re-attempt a test. TestId, name, and email are required.
  reattemptCandidate(testId : number, testInvitationId: number, startDate?: Date, endDate?: Date, timeZoneId?: number): Observable<any> {
    //Set the start and end date range to 7 days.
    if(!endDate || !startDate) {
      startDate = new Date();
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
    }
    //Set the timeZoneId with util according to the imocha timezone codes
    if(!timeZoneId) {
      timeZoneId = this.util.translateTimeZone();
    }
    
    //changing the string formatting to comply with iMocha api
    const startDateString = startDate.toISOString().split('.')[0] + 'Z';
    const endDateString = endDate.toISOString().split('.')[0] + 'Z';
    return this.http.post<any>(this.urlBuilder(`reattempt/${testInvitationId}`), {startDateTime : startDateString, endDateTime: endDateString, timeZoneId, testId});
  }
  
  //grabs all attempts and organizes only completed attemps by test ids. 
  processAttempts(attempts : TestInvitation[]) : Record<number, TestInvitation[]> {
    let testToAttemptsMap : Record<number, TestInvitation[]> = {};
    for(let attempt of attempts) {
      if(attempt.teststatus === 'Complete') {
        if(!(attempt.testId in testToAttemptsMap)) {
          testToAttemptsMap[attempt.testId] = [attempt];
        }
        else {
          testToAttemptsMap[attempt.testId].push(attempt);
        }
      }
    }
    return testToAttemptsMap;
  }

  //Grabs all tests labelled 'Video Test' from iMocha. By default, it grabs 100 tests
  getTests(pageNo : number = 1, itemsPerPage : number = 100) : Observable<{tests: VideoTest[]}> {
    return this.http.get<{tests: VideoTest[]}>(this.urlBuilder(`tests?pageNo=${pageNo}&pageSize=${itemsPerPage}`))
  }

  //Get a particular test information via test Id.
  getTestDetailByTestId(testId : number) : Observable<VideoTest> {
    return this.http.get<VideoTest>(this.urlBuilder(`tests/${testId}`))
  }

  //Gets all test attempts from a date range.
  //Automatically sets the date range to the past 30 days, unless given a specific date range
  //Additionally, you can call this method with testId to filter it by a particular testId 
  getTestAttempts(testId? : number, startDate?: Date, endDate?: Date) : Observable<TestInvitation[]> {
    if(!endDate && !startDate) {
      endDate = new Date();
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 30);
    }
    return this.http.post<TestInvitation[]>(this.urlBuilder('tests/attempts'), {
      "startDateTime": startDate,
      "endDateTime": endDate,
      "testId": testId
    })
  }

  //This method gets the data regarding test attempt itself. Also includes total cumulatie score
  getTestAttemptByTestAttemptId(testAttemptId: number) : Observable<TestInvitation> {
    return this.http.get<TestInvitation>(this.urlBuilder(`reports/${testAttemptId}`))
  }

  //gets each question detail and score for one test attempt
  getQuestionsByTestAttemptId(testAttemptId : number) : Observable<{result : TestAttemptQuestion[]}> {
    return this.http.get<{result : TestAttemptQuestion[]}>(this.urlBuilder(`reports/${testAttemptId}/questions`));
  }
}
