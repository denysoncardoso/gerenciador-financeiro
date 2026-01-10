import {Component, inject, signal} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {TransactionsService} from '../../../../shared/transactions/services/transactions.service';
import {FeedbackService} from '../../../../shared/feedback/services/feedback.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogService} from '../../../../shared/dialog/confirmation/services/confirmation-dialog.service';
import {Transaction} from '../../../../shared/transactions/interfaces/transaction';
import {TransactionItem} from './components/transaction-item/transaction-item';
import {Balance} from './components/balance/balance';
import {NoTransactions} from './components/no-transactions/no-transactions';

@Component({
  selector: 'app-list',
  imports: [
    Balance,
    TransactionItem,
    NoTransactions,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  // private httpClient = inject(HttpClient);

  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private confirmationDialogService = inject(ConfirmationDialogService)

  transactions = signal<Transaction[]>([]);


  ngOnInit() {
    this.getTransaction();
  }

  editTransaction(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id]);
  }

  removeTransaction(transaction: Transaction) {

    this.confirmationDialogService.open({
      title: 'Remover transação',
      message: 'Tem certeza que deseja remover esta transação?',
    }).subscribe({
      next: () => {
        this.transactionsService.delete(transaction.id).subscribe({
          next: () => {
            this.removeTransactionFromArray(transaction);
            this.feedbackService.success('Transação removida com sucesso');
          }
        });
      }
    })


  }

  private removeTransactionFromArray(transaction: Transaction) {
    this.transactions.update(transactions =>
      transactions.filter(item => item.id !== transaction.id)
    );
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
