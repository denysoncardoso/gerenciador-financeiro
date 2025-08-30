import {Component, computed, input} from '@angular/core';
import {BalanceCard} from './components/balance-card/balance-card';

@Component({
  selector: 'app-balance',
  imports: [
    BalanceCard
  ],
  templateUrl: './balance.html',
  styleUrl: './balance.scss'
})
export class Balance {

  transactions = input.required<{ values: number, type: string }[]>();

  totalIncomes = computed(() =>{
    return this.transactions()
      .filter(item => item.type === 'income')
      .reduce((total, item) => total + item.values, 0)
  })

  totalOutcomes = computed(() =>{
    return this.transactions()
      .filter(item => item.type === 'outcome')
      .reduce((total, item) => total + item.values, 0)
  })

  balance = computed(() =>{
    return this.totalIncomes() - this.totalOutcomes()
  })
}
