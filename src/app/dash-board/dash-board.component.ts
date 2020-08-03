import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TransactionComponent } from '../transaction/transaction.component';
import { Router } from '@angular/router';
import { Transaction } from '../transaction/transaction.component';
import * as bent from 'bent';
import { restApiPort } from '../../config';
import { async } from '@angular/core/testing';
const apiCall = bent('http://localhost:' + restApiPort + '/', 'GET', 'json', 200);

class DashBoard {
  transactions:any = [];
  credit:any;

}

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
dash = new DashBoard();

showList = false;
transactionList: Promise<any>;
changeShowList():void{
	this.showList = !this.showList;
}
  constructor(private cookieService: CookieService, private router: Router) { 
    if (this.cookieService.check('authtoken')) {
			this.transactionList = (async () => {
				try {
					const response = await apiCall('get-transactions?token='
						+ encodeURIComponent(this.cookieService.get('authtoken')));
					if (response.status === 'OK') {
						this.dash.credit = response.debit;
				  	return	this.dash.transactions = response.transactions;
					} else {
						return 'failure';
					}
				} catch (e) {
					return 'error: ' + e;
				}
			})();
		}else{
			this.router.navigate(['auth-error'])
		}
  }

 
  ngOnInit(): void {
  }
}
