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


@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    JsonPipe,
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

  readonly transationType = TransactionType;



  form = new FormGroup({

    title: new FormControl('', {
      validators: [Validators.required]
    }),
    value: new FormControl(0, {
      validators: [Validators.required]
    }),
    type: new FormControl('', {})

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

      }
    });
  }

}
