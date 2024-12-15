import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenAddedSubject = new Subject<void>(); // This will notify other components when a token is added

  constructor(private http: HttpClient) {}

  // This observable will allow other components to subscribe to token addition events
  get tokenAdded$() {
    return this.tokenAddedSubject.asObservable();
  }

  findAllTokens(): Observable<any> {
    return this.http.get('/api/tokens');
  }

  addToken(): Observable<any> {
    return this.http.post('api/tokens', {}).pipe(
      // After a successful post, notify the other components
      tap(() => this.tokenAddedSubject.next())
    );
  }

  deleteToken(tokenId: number): Observable<any> {
    return this.http.delete(`/api/tokens/${tokenId}`).pipe(
      catchError((err) => {
        console.log('Error deleting token:', err);
        throw err;
      })
    );
  }

  returnToken(tokenId: number): Observable<any> {
    return this.http.put(`/api/tokens/${tokenId}/return`, {});
  }

  assignToken(
    tokenId: number,
    userId: string,
    userOrg: string
  ): Observable<any> {
    const payload = { userId, userOrg };
    return this.http.put(`/api/tokens/${tokenId}/assign`, payload);
  }
}
