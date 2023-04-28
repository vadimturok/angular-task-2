import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ADD_USER_URL, DELETE_USER_URL, GET_USERS_URL} from "../constants/urls";
import {UserBody} from "../models/user-body";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = []
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users)

  constructor(private http: HttpClient) { }

  getUsersObservable(): Observable<User[]>{
    return this.usersSubject.asObservable()
  }

  getAllUsers(){
    this.http.get<User[]>(GET_USERS_URL).subscribe(users => {
      this.users = users.map(user => {
        return {...user, imageUrl: `https://picsum.photos/id/${user.id}/250/200`}
      })
      this.usersSubject.next(this.users)
    })
  }

  createUser(user: UserBody){
    this.http.post<User>(ADD_USER_URL, user).subscribe(newUser => {
      this.users = [...this.users, {...newUser, imageUrl: `https://picsum.photos/id/${newUser.id}/250/200`}]
      this.usersSubject.next(this.users)
    })
  }

  deleteUsers(usersToDelete: User[]){
    usersToDelete.forEach(user => {
      this.http.delete<User>(DELETE_USER_URL + `/${user.id}`)
    })
    this.users = this.users.filter(user => !usersToDelete.includes(user))
    this.usersSubject.next(this.users)
  }
  searchUsers(term: string){
    if(term.length == 0){
      this.getAllUsers()
    }else{
      this.users = this.users.filter(user => user.name.toLowerCase().includes(term.toLowerCase()))
    }
    this.usersSubject.next(this.users)
  }

  orderByName(orderType: 'firstname' | 'lastname'){
    this.users = this.users.sort((a, b) => {
      const a_name = a.name.split(' ')
      const b_name = b.name.split(' ')
      if(orderType === 'firstname'){
        return a_name[0].localeCompare(b_name[0])
      }else{
        return a_name[1].localeCompare(b_name[1])
      }
    })
    this.usersSubject.next(this.users)
  }

}
