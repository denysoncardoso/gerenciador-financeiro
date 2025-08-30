import {Component, signal} from '@angular/core';
import {Balance} from './components/balance/balance';

@Component({
  selector: 'app-home',
  imports: [
    Balance
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  transactions = signal([
    { values: 1000, type: 'income' },
    { values: 250, type: 'outcome' },
    { values: 250, type: 'outcome' },

  ]);

}
