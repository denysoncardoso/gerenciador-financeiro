import {TransactionType} from '../enums/transactions-types';


export interface Transaction {
  title: string;
  value: number;
  type: TransactionType;
}
