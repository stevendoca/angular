import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
export class Transaction {
  date: Date = new Date();
  description: string ="";
  account: string = "";
  credit: number = 0;

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
  ngOnInit(): void {
  }

}
