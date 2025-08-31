import {Component, signal} from '@angular/core';
import {Balance} from './components/balance/balance';
import {TransactionItem} from './components/transaction-item/transaction-item';

@Component({
  selector: 'app-home',
  imports: [
    Balance,
    TransactionItem
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  transactions = signal([
    { values: 1000, type: 'income' },
    { values: 500, type: 'outcome' },
    { values: 500, type: 'outcome' },

  ]);

}
