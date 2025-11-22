import {Component, inject, input} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {TransactionPayload} from '../../../../shared/transactions/interfaces/transaction';
import {TransactionType} from '../../../../shared/transactions/enums/transactions-types';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxMaskDirective} from 'ngx-mask';
import {TransactionsService} from '../../../../shared/transactions/services/transactions.service';
import {Router} from '@angular/router';
import {FeedbackService} from '../../../../shared/feedback/services/feedback.service';


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
  private feedbackService = inject(FeedbackService);

  readonly transationType = TransactionType;


  form = new FormGroup({

    title: new FormControl('', {
      validators: [Validators.required]
    }),
    value: new FormControl(null, {
      validators: [Validators.required]
    }),
    type: new FormControl('', {
      validators: [Validators.required]
    })

  });

  submit() {
    if (this.form.invalid) return;

    const payload: TransactionPayload = {
      title: this.form.value.title as string,
      value: Number(this.form.value.value ?? 0),
      type: this.form.value.type as TransactionType,
    };

    this.transationsService.post(payload).subscribe({
      next: (transaction) => {
        this.feedbackService.success('Transação criada com sucesso!');

        this.router.navigate(['/']);
      }
    });
  }

}
