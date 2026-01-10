import {Component, input, output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {TransactionValues} from './components/transaction-values/transaction-values';
import {Transaction} from '../../../../../../shared/transactions/interfaces/transaction';


@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule, MatButtonModule, TransactionValues],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss'
})
export class TransactionItem {

  transaction = input.required<Transaction>();

  editTransaction = output<Transaction>();

  removeTransaction = output<Transaction>();
}
