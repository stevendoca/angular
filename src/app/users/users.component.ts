import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as bent from 'bent';
import { restApiPort } from '../../config';
const apiCall = bent('http://localhost:' + restApiPort + '/', 'GET', 'json', 200);

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	username = new FormControl('');
	password = new FormControl('');
	confirmPassword = new FormControl('');
	passwordNotMatch = false;
	noUserName = false;
	noPassword = false;
	noConfirmPassword = false;
	success = false;
	msg: Promise<string>;
	constructor() { }
	ngOnInit(): void {
	}
	createUser(): void {
		this.msg = (async () => {
			//Validation to ensure user name, password and confirm password are valid
			if (this.username.value == ''){
				this.noUserName = true;
			}

			if (this.password.value == ''){
				this.noPassword = true;
			}

			if (this.confirmPassword.value == ''){
				this.noConfirmPassword = true;
			}

			if (this.password.value !== this.confirmPassword.value){
				this.passwordNotMatch = true;

			}
			if ( !this.noUserName && !this.noPassword && !this.noConfirmPassword && (this.password.value === this.confirmPassword.value)){
				console.log('go through')
				try {
					const call = 'create-user?username='
						+ encodeURIComponent(this.username.value) + '&password='
						+ encodeURIComponent(this.password.value);
					const response = await apiCall(call);
					if (response.status === "Create user successfully"){
						this.success = true;
					}
					return (response.status);
				} catch (e) {
					return 'error: ' + e;
				}
			}
			
		})();
	}

}
