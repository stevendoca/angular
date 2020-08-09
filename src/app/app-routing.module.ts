import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { TransactionComponent } from './transaction/transaction.component';
import { MenuComponent } from './menu/menu.component';
import { ErrorComponent} from './error/error.component';
import { ErrorAuthComponent } from './error-auth/error-auth.component';
import {DashBoardComponent} from './dash-board/dash-board.component'

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'create-user', component: UsersComponent},
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'dashboard', component: DashBoardComponent},
  {path: 'error', component:ErrorComponent},
  {path: 'auth-error', component:ErrorAuthComponent},
  {path: '**', component:ErrorComponent},

];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
