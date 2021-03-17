import { serverAppURL } from './../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './../register/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserSubject: BehaviorSubject<any>;
    constructor(private http: HttpClient,
        private store: AngularFirestore
        ) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    register(user: User): Promise<any> {
        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        const requestOptions = {
            headers: new HttpHeaders(headerDict),
        };

        let data = JSON.stringify({email: user.username, password: user.password});
        return this.http.post<any>(serverAppURL, data, requestOptions)
        .toPromise()
        .then(user_1 => {
            localStorage.setItem('currentUser', JSON.stringify(user_1));
            this.currentUserSubject.next(user_1);
            console.log(user_1);
            return user_1;
        })
        // store user details and token in local storage to keep user logged in between page refreshes
        //return await this.store.collection<User>('users').add(user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}