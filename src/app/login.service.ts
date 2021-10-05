import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// const HttpUploadOptions = {
//   headers: new HttpHeaders({ "Content-Type": "multipart/form-data", "Authkey":"test-angular-2021" })
// }

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  loginUrl = environment.baseUrl;
  verifyUrl = environment.baseVerifyOtpUrl;
  userUrl = environment.baseGetUSerURl;
 

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Authkey':'test-angular-2021'
    })
  }  





  // HttpClient API get() method => Fetch employee
  getEmployee(id): Observable<any> {
    return this.http.get(this.loginUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

 

  login(formdata): Observable<any> {

    return this.http.post(this.loginUrl , formdata)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  verifyOtp(formdata): Observable<any> {
    
    return this.http.post(this.verifyUrl , formdata)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUsersData(formdata): Observable<any> {
    
    return this.http.post(this.userUrl , formdata)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

 

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}