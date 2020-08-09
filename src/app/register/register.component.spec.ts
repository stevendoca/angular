import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent, Register } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {Transaction, TransactionComponent} from '../transaction/transaction.component'

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,      
      ],
      declarations: [ RegisterComponent,TransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display empty input', fakeAsync(() => {
    const native = fixture.debugElement.nativeElement;
    const date:HTMLInputElement = native.querySelector('#date');
    const description:HTMLInputElement = native.querySelector('#description');
    const account:HTMLInputElement = native.querySelector('#account');
    const amount:HTMLInputElement = native.querySelector('#amount');

    //date.value = '08 05 2020';
    description.value = 'red bull';
    account.value = 'energy drink';
    amount.value = '10';
    let button =native.querySelector('button');
    button.click();
    tick();
    fixture.detectChanges();
  
    expect(description.value).toBe('')

  }));
 
});
