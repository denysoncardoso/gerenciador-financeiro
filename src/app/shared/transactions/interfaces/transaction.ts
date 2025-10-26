import {TransactionType} from '../enums/transactions-types';


export interface Transaction {
  id: number;
  title: string;
  value: number;
  type: TransactionType;
}

export type TransactionPayload = Omit<Transaction, 'id'>;
