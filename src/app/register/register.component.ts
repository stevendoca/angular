import { Component, Input, OnInit } from '@angular/core';
import { TransactionComponent } from '../transaction/transaction.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Transaction } from '../transaction/transaction.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as bent from 'bent';
import { restApiPort } from '../../config';
import { async } from '@angular/core/testing';
const apiCall = bent('http://localhost:' + restApiPort + '/', 'GET', 'json', 200);


export class Register {
  transactions: Array<Transaction> = [];
  totalCredit:number = 0;
  constructor () {};
  
  addTr(tr: Transaction):void{
    this.transactions.push(tr)
  }
 
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  date = new FormControl('');
	description = new FormControl('');
  account = new FormControl('');
  amount = new FormControl('');
  newDate:Date;
  newDescription:string;
  newAccount:string;
  newCredit:number;
  msg: Promise<string>;
  
  constructor(private cookieService: CookieService, private router: Router){
  };
  
 
 
  updateDate(event: Event):void{
    this.newDate = new Date((<HTMLInputElement>event.target).value);
  }

  updateDescription(event: Event):void{
    this.newDescription = (<HTMLInputElement>event.target).value;
  }

  updateAccount (event: Event):void {
    this.newAccount = (<HTMLInputElement>event.target).value;
  }

  updateCredit (event: Event):void {
    let update = Number((<HTMLInputElement>event.target).value);
    this.newCredit = Number((Math.round(update * 100) / 100).toFixed(2));
  }

 
  addServer(): void {
    this.msg = (async () => {
      if (this.cookieService.check('authtoken')){
        if (this.newDate && this.newDescription && this.newAccount && this.newAccount){
          try {
            const call = 'add-transaction?date='
              + this.newDate + '&description='
              + encodeURIComponent(this.newDescription) + '&account='
              + encodeURIComponent(this.newAccount) + '&credit='
              + encodeURIComponent(this.newCredit) + '&token='
              + encodeURIComponent(this.cookieService.get('authtoken'))
              
            const response = await apiCall(call);
            this.date.setValue('');
            this.description.setValue('');
            this.account.setValue('');
            this.amount.setValue('');
            return (response.status);
          } catch (e) {
            return 'error: ' + e;
          }
        }else{
          return 'Please provide all information'
        }
        
      }	else{
        this.router.navigate(['auth-error'])
      }						
		})();
  }
  ngOnInit(): void {

  }
}
