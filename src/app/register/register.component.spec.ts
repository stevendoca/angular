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
  // it('should have total of 3 transactions', () => {
  //   component.register = new Register();
  //   expect(component.register.transactions.length).toBe(3);
  // })

  // it('should have total of 4 transactions', () => {
  //   component.register = new Register();
  //   let transaction1 = new Transaction('milk','dairy', 5)
  //   component.register.addTr(transaction1)
  //   expect(component.register.transactions.length).toBe(4);
  // })

//   it('should have a table with 3 row for 3 transactions', () => {
//     component.register = new Register();
//     fixture.detectChanges();	
    
//     let trs = fixture.debugElement.nativeElement.querySelectorAll(".transaction");
//     for (let i in trs) {
//     expect(trs[i].childNodes.length).toBe(11);
// }
//   });
  
//   it("should contain the class 'debit' in the 4th td of the first tr", fakeAsync(() => {
//    component.register = new Register();
//    fixture.detectChanges();	
   
//    let trs = fixture.debugElement.nativeElement.querySelector('.transaction');
//    //expect(tr.childNodes.length).toBe(3);
//    expect(trs.childNodes[3].classList).toContain('debit');
//  }));

//  it('should provide correct display when button is pressed', fakeAsync(() => {
//   component.register = new Register();
//   let tran1 = new Transaction('soda','drinking',-7)
//   let tran2 = new Transaction('salary','income',1000)
//   component.register.addTr(tran1)
//   component.register.addTr(tran2)
//   let btn = fixture.debugElement.nativeElement.querySelector('button');
//   btn.click();
//   tick();	// need a tick because I'm about to test the HTML
//   fixture.detectChanges();
//   let trs = fixture.debugElement.nativeElement.querySelectorAll('.transaction');
//   let fourthRow = trs[3]; // it is tran1
//   // expect(fourthRow.childNodes[3].classList).not.toContain('credit');
//   // expect(fourthRow.childNodes[1].innerText).toBe('soda');
//   // expect(fourthRow.childNodes[3].innerText).toBe('7.00');
//   let fifthRow = trs[4]; // it is tran2
//   expect(fifthRow.childNodes[8].innerText).toBe('1000.00');  
// }));

 
});
