import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { TransactionComponent } from './transaction/transaction.component';
import { MenuComponent } from './menu/menu.component';
import {DashBoardComponent} from './dash-board/dash-board.component'

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'create-user', component: UsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'dashboard', component: DashBoardComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
