import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-auth',
  templateUrl: './error-auth.component.html',
  styleUrls: ['./error-auth.component.css']
})
export class ErrorAuthComponent implements OnInit {
  redirectHome():void{
    this.router.navigate([''])
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
