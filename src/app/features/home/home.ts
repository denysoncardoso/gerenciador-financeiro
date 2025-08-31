import {Component, signal} from '@angular/core';
import {Balance} from './components/balance/balance';
import {TransactionItem} from './components/transaction-item/transaction-item';
import {Transaction} from '../../shared/transactions/interfaces/transaction';
import {TransactionType} from '../../shared/transactions/enums/transactions-types';


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

  transactions = signal<Transaction[]>([
    { title: 'Salário', value: 1000, type: TransactionType.income },
    { title: 'Aluguel', value: 500, type: TransactionType.outcome },
    { title: 'Comida', value: 500, type: TransactionType.outcome},

  ]);

}
