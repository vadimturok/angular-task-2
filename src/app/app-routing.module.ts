import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateUserComponent} from "./pages/create-user/create-user.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create', component: CreateUserComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
