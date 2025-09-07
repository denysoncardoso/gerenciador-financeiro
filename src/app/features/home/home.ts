import {Component, inject, OnInit, signal} from '@angular/core';
import {Balance} from './components/balance/balance';
import {TransactionItem} from './components/transaction-item/transaction-item';
import {Transaction} from '../../shared/transactions/interfaces/transaction';
import {TransactionType} from '../../shared/transactions/enums/transactions-types';
import {NoTransactions} from './components/no-transactions/no-transactions';
import {HttpClient} from '@angular/common/http';
import {TransactionsService} from '../../shared/transactions/services/transactions';


@Component({
  selector: 'app-home',
  imports: [
    Balance,
    TransactionItem,
    NoTransactions
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{

  // private httpClient = inject(HttpClient);

  private transactionsService = inject(TransactionsService);

  transactions = signal<Transaction[]>([]);


  ngOnInit() {
    this.getTransaction();
  }

  private getTransaction() {
    this.transactionsService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }
}
