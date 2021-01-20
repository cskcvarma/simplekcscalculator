import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'simple-calculator';
  constructor() {
    this.calculatorForm.get('kcsYouOwn').valueChanges.subscribe(v => {
     this.dailyResult = this.calculateAndUpdate(v);
    });
    this.calculatorForm.get('dailyTradingVolume').valueChanges.subscribe(v => {
      this.calculatorForm.get('tradingFeesCollected').patchValue(
        (this.calculatorForm.get('averageTradingFee').value / 100) * (this.calculatorForm.get('dailyTradingVolume').value / 100));
    });
  }
  public dailyResult = 0.00;
  public calculatorForm: FormGroup = new FormGroup({
    kcsStacked: new FormControl(100000000),
    kcsYouOwn: new FormControl(),
    dailyTradingVolume: new FormControl(100000000),
    averageTradingFee: new FormControl(0.1),
    tradingFeesCollected: new FormControl()
  });

  ngOnInit(): void {
    this.calculatorForm.get('tradingFeesCollected').patchValue(
      (this.calculatorForm.get('averageTradingFee').value / 100) * (this.calculatorForm.get('dailyTradingVolume').value / 100));
  }
  calculateAndUpdate(v): number{
    const value: any = this.calculatorForm.value;
    return (((value.averageTradingFee / 100) * (value.dailyTradingVolume / 2)) / value.kcsStacked) * v;
  }
}
