import {Component, computed, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {TransactionType} from '../../../../../../../../shared/transactions/enums/transactions-types';
import {Transaction} from '../../../../../../../../shared/transactions/interfaces/transaction';

const CssClass = {
  [TransactionType.income]: 'income',
  [TransactionType.outcome]: 'outcome',
}
@Component({
  selector: 'app-transaction-values',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './transaction-values.html',
  styleUrl: './transaction-values.scss',
  host:{
    '[class]': 'cssClass()'
  }
})
export class TransactionValues {

  transaction = input.required<Transaction>();

  cssClass = computed(() => CssClass[this.transaction().type]);

}
