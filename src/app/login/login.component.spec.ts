import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginComponent,Login } from './login.component';
import {By} from "@angular/platform-browser";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,      
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display warning message when empty username and password provided', fakeAsync(() => {
    let button =fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('#warning')).toBeTruthy();
  }));
  it('should login successfully', fakeAsync(() => {
    let native = fixture.debugElement.nativeElement;
    const name:HTMLInputElement = native.querySelector('#userNameInput');
    const password:HTMLInputElement = native.querySelector('#passwordInput');
    name.value = 'steven';
    password.value = '1234';
    let button =native.querySelector('button');
    button.click();
    tick();
    let paragraph = native.querySelector('div')
    expect(paragraph.length).toBe(2);
  }));
});
