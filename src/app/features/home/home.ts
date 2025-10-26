import {Component, inject, OnInit, signal} from '@angular/core';
import {Balance} from './components/balance/balance';
import {TransactionItem} from './components/transaction-item/transaction-item';
import {Transaction} from '../../shared/transactions/interfaces/transaction';
import {NoTransactions} from './components/no-transactions/no-transactions';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {TransactionsService} from '../../shared/transactions/services/transactions.service';


@Component({
  selector: 'app-home',
  imports: [
    Balance,
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
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
