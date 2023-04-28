import {Component} from '@angular/core';
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users!: User[];
  selectedUsers: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getAllUsers()
    this.userService.getUsersObservable().subscribe(users => {
      this.users = users
    })
  }

  selectAll(){
    this.selectedUsers = this.users
  }

  selectOne(checked: boolean, user: User){
    if(checked){
      this.selectedUsers.push(user)
    }else{
      this.selectedUsers = this.selectedUsers.filter(u => u.id !== user.id)
    }
  }

  delete(){
    this.userService.deleteUsers(this.selectedUsers)
    this.selectedUsers = []
  }

  find(term: string){
    this.userService.searchUsers(term)
  }

  orderByName(event: MatSelectChange){
    this.userService.orderByName(event.value)
  }
}
