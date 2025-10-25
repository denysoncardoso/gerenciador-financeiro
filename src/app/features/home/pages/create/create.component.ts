import {Component, input} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {Transaction} from '../../../../shared/transactions/interfaces/transaction';
import {TransactionType} from '../../../../shared/transactions/enums/transactions-types';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxMaskDirective} from 'ngx-mask';


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
  transaction = input<Transaction>();

  readonly transationType = TransactionType;

  form = new FormGroup({

    title: new FormControl('', {
      validators: [Validators.required]
    }),
    value: new FormControl('', {
      validators: [Validators.required]
    }),
    type: new FormControl('', {})

  })

}
