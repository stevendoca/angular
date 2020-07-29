import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { restApiPort } from '../../config';
import * as bent from 'bent';
import { Router } from '@angular/router';

const apiCall = bent('http://localhost:' + restApiPort + '/', 'GET', 'json', 200);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg: Promise<string>;
	username = new FormControl('');
	password = new FormControl('');
	constructor(private cookieService: CookieService, private router: Router) { }
	ngOnInit(): void {
	}
	login(): void {
		this.msg = (async () => {
			try {
				const response = await apiCall('authenticate?username='
					+ encodeURIComponent(this.username.value) + '&password='
          + encodeURIComponent(this.password.value));
          
				if (response.status === 'OK') {
					this.cookieService.set('authtoken', response.token);
					this.router.navigate(['menu'])
        		}       
				return response.status;
			} catch (e) {
				return 'error: ' + e;
			}
		})();
	}

}
