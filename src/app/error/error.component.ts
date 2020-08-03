import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  redirectHome():void{
    this.router.navigate([''])
  }
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

}
