import {Component, computed, inject, input} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {Transaction, TransactionPayload} from '../../../../shared/transactions/interfaces/transaction';
import {TransactionType} from '../../../../shared/transactions/enums/transactions-types';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxMaskDirective} from 'ngx-mask';
import {TransactionsService} from '../../../../shared/transactions/services/transactions.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedbackService} from '../../../../shared/feedback/services/feedback.service';
import {tap} from 'rxjs';


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
  templateUrl: './create-or-edit.component.html',
  standalone: true,
  styleUrl: './create-or-edit.component.scss'
})
export class CreateOrEditComponent {
  //injects
  private transationsService = inject(TransactionsService);
  private router = inject(Router);
  private feedbackService = inject(FeedbackService);

  transaction = input<Transaction>();

  readonly transationType = TransactionType;


  isEdit = computed(() => this.transaction()?.id !== undefined);

  form = computed(
    () =>
      new FormGroup({
        title: new FormControl(this.transaction()?.title ?? '', {
          validators: [Validators.required]
        }),
        value: new FormControl(this.transaction()?.value ?? null, {
          validators: [Validators.required]
        }),
        type: new FormControl(this.transaction()?.type ?? '', {
          validators: [Validators.required]
        })

      }));

  submit() {
    if (this.form().invalid) return;

    const payload: TransactionPayload = {
      title: this.form().value.title as string,
      value: Number(this.form().value.value ?? 0),
      type: this.form().value.type as TransactionType,
    };

    this.createOrEdit(payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

  private createOrEdit(payload: TransactionPayload) {
    if (this.isEdit()) {
      return this.transationsService
        .put(this.transaction()!.id, payload)
        .pipe(
          tap(() =>
            this.feedbackService.success('Transação atualizada com sucesso!')
          ),
        );
    } else {
      return this.transationsService
        .post(payload)
        .pipe(
          tap(() =>
            this.feedbackService.success('Transação atualizada com sucesso!')
          ),
        );
    }
  }
}
