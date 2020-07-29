import { Component, Input, OnInit } from '@angular/core';
import { TransactionComponent } from '../transaction/transaction.component';
import { Transaction } from '../transaction/transaction.component';
import { CookieService } from 'ngx-cookie-service';
import * as bent from 'bent';
import { restApiPort } from '../../config';
import { async } from '@angular/core/testing';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
const apiCall = bent('http://localhost:' + restApiPort + '/', 'GET', 'json', 200);


export class Register {
  closeResult = '';
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
  newDate:Date;
  newDescription:string;
  newAccount:string;
  newCredit:number;
  msg: Promise<string>;
  closeResult = '';
  constructor(private cookieService: CookieService,private modalService: NgbModal){};
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
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
        try {
					const call = 'add-transaction?date='
						+ this.newDate + '&description='
            + encodeURIComponent(this.newDescription) + '&account='
            + encodeURIComponent(this.newAccount) + '&credit='
            + encodeURIComponent(this.newCredit) + '&token='
            + encodeURIComponent(this.cookieService.get('authtoken'))
            
					const response = await apiCall(call);
					return (response.status);
				} catch (e) {
					return 'error: ' + e;
				}
      }							
		})();
  }
  ngOnInit(): void {

  }
}
