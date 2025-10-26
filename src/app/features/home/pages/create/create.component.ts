import {Component, inject, input} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {Transaction, TransactionPayload} from '../../../../shared/transactions/interfaces/transaction';
import {TransactionType} from '../../../../shared/transactions/enums/transactions-types';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxMaskDirective} from 'ngx-mask';
import {TransactionsService} from '../../../../shared/transactions/services/transactions.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
  ],
  templateUrl: './create.component.html',
  standalone: true,
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  //injects
  private transationsService = inject(TransactionsService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  readonly transationType = TransactionType;



  form = new FormGroup({

    title: new FormControl('', {
      validators: [Validators.required]
    }),
    value: new FormControl(0, {
      validators: [Validators.required]
    }),
    type: new FormControl('', {
      validators: [Validators.required]
    })

  });

  submit(){
    if (this.form.invalid) return;

    const payload: TransactionPayload = {
      title: this.form.value.title as string,
      value: this.form.value.value as number,
      type: this.form.value.type as TransactionType,
    };

    this.transationsService.post(payload).subscribe({
      next: (transaction) => {
        this.router.navigate(['/']);
        this.snackBar.open('Transação criada com sucesso!', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'success-snack-bar',
          duration: 3000,
        });
      }
    });
  }

}
