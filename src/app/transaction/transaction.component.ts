import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { restApiPort } from '../../config';
import * as bent from 'bent';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

const apiCall = bent('http://localhost:' + restApiPort + '/', 'GET', 'json', 200);

export class Transaction {
  date: Date = new Date();
  description: string ="";
  account: string = "";
  credit: number = 0;
  _id: any;

  constructor (description: string, account: string, credit: number, date: Date = new Date()) {
    this.date = date;
    this.description = description;
    this.account = account;
    this.credit = credit
  }

  isDebit ():boolean {
    return this.credit < 0;
  }

  isCredit ():boolean {
    return this.credit > 0;
  }
}
@Component({
  selector: '[app-transaction]',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
    @Input() transaction:Transaction = new Transaction('productName','category',4);
    msg: Promise<any>;

    deleteTrans(event):void{
      this.msg = (async () => {
          try {
            const call = 'delete-transaction?id='
              + encodeURIComponent(event.target.value)
              
            const response = await apiCall(call);
            // return (response.status);
          } catch (e) {
            console.log( 'error: ' + e);
          }
      })();
     }
  ngOnInit(): void {
  }

}
