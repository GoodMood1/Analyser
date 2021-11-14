import {Component, ElementRef, ViewChild} from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    user: User;
  currentNumber = '0';
  currentNumber3 = '0';
  currentNumber1 = 'Average consumption: 0';
  currentNumber2 = 'Fuel cost: 0';
  currentNumber4 = '';
  currentNumbImage = '';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  @ViewChild('inpSum') inpSum: ElementRef;
  @ViewChild('inpPercent') inpPercent: ElementRef;
  @ViewChild('Usedup') Usedup: ElementRef;
  @ViewChild('Distancetraveled') Distancetraveled: ElementRef;
  @ViewChild('Fuelcost') Fuelcost: ElementRef;
  @ViewChild('MaxWeight') MaxWeight: ElementRef;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

  public getNumber(v: string){
    console.log(v);
    if (this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;

    }
  }

  getDecimal(){
    if (!this.currentNumber.includes('.')){
      this.currentNumber += '.';
    }
  }

  private doCalculation(op , secondOp){
    switch (op){
      case '+':
        return this.firstOperand += secondOp;
      case '-':
        return this.firstOperand -= secondOp;
      case '*':
        return this.firstOperand *= secondOp;
      case '/':
        return this.firstOperand /= secondOp;
      case '=':
        return secondOp;
    }
  }
  public getOperation(op: string){
    if (this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if (this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber));
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

  }

  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
  public clear2(){
    this.currentNumber3 = '0';
    this.inpSum.nativeElement.value = null;
    this.inpPercent.nativeElement.value = null;
  }
  public clear3(){
    this.currentNumber1 = 'Average consumption: 0';
    this.currentNumber2 = 'Fuel cost: 0';
    this.Usedup.nativeElement.value = null;
    this.Fuelcost.nativeElement.value = null;
    this.Distancetraveled.nativeElement.value = null;
  }
  public clear4(){
    this.currentNumber4 = '';
    this.MaxWeight.nativeElement.value = null;
  }
  public AmmountOfPercentage(){
this.currentNumber3 = String(((this.inpSum.nativeElement.value * this.inpPercent.nativeElement.value) / 100).toFixed(2));
  }
  public AveragefuelConsumption(){
    this.currentNumber1 = String('Average consumption: ' + ((this.Usedup.nativeElement.value / this.Distancetraveled.nativeElement.value) * 100).toFixed(2));
    this.currentNumber2 = String('Fuel cost: ' + (this.Fuelcost.nativeElement.value * this.Distancetraveled.nativeElement.value).toFixed(2));
  }
  public MaxWeightLift(op: number){
      op = this.MaxWeight.nativeElement.value;
      if (op <= 49)
      {
        this.currentNumbImage = 'url(https://inlnk.ru/ELnvj)';
        this.currentNumber4 = 'Сoelacanth fish(1kg-49kg)';
        console.log(this.currentNumbImage);
      }
        else if (op <= 60) {
        this.currentNumbImage = 'url(https://inlnk.ru/go15O)';
        this.currentNumber4 = 'grandma\'s cart';
      }
      else if (op <= 100) {
        this.currentNumbImage = 'url(https://inlnk.ru/Jj8gR)';
        this.currentNumber4 = 'Catfish';
      }
      else if (op <= 260) {
        this.currentNumbImage = 'url(https://inlnk.ru/n0Vll)';
        this.currentNumber4 = 'Sumo';
      }
      else if (op <= 490) {
        this.currentNumbImage = 'url(https://inlnk.ru/DB3Vz)';
        this.currentNumber4 = 'Mammoth';
      }
      else if (op <= 900) {
        this.currentNumbImage = 'url(https://inlnk.ru/84gek)';
        this.currentNumber4 = 'Servers';
      }
      else if (op <= 1000) {
        this.currentNumbImage = 'url(https://inlnk.ru/meZ1Y)';
        this.currentNumber4 = 'Police car';
    }
  }
}
