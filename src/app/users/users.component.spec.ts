import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        
      ],
      declarations: [ UsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display warning for missing password', fakeAsync(() => {
    let native = fixture.debugElement.nativeElement;
    const name:HTMLInputElement = native.querySelector('#userNameInput');
    const password:HTMLInputElement = native.querySelector('#passwordInput');
    const confirmPassword:HTMLInputElement = native.querySelector('#confirmPasswordInput');
    name.value = 'test';
    password.value = '';
    confirmPassword.value = '';
    let button =native.querySelector('button');
    button.click();
    tick();
    fixture.detectChanges();
    let changedElement = native.querySelector('#emptyPassword');
    // let test = native.querySelector('#test');
    // expect(test.textContent).toBe('abcd')
    fixture.detectChanges();

       expect(changedElement.textContent).toBe('Must provide password')

  }));

  // it('should display success msg', () => {
  //   expect(component).toBeTruthy();
  // });
});
