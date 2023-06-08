import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImochaService {
  private baseurl: string = environment.APIBaseURL + 'imocha/';
  constructor(private http: HttpClient) { }

  private urlBuilder(urlSegment: string) {
    return this.baseurl + urlSegment;
  }

  //Invites candidate through iMocha api. TestId, name, and email are required 
  inviteCandidate(testId: number, name: string, email: string): Observable<any> {
    return this.http.post<any>(this.urlBuilder('invite'), { testId, email, name });
  }
}
