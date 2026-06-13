import { TransactionEntity, TransactionUpdateData } from "./transaction.entity";

export interface TransactionRepository {
    getTransactions(cmp_uuid: string, usr_uuid?: string, uni_uuid?: string, usruni_uuid?: string, fee_uuid?: string, filters?: any): Promise<TransactionEntity[] | null>;
    findTransactionById(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, tra_uuid: string): Promise<TransactionEntity | null>;
    createTransaction(transaction: TransactionEntity): Promise<TransactionEntity | null>;
    updateTransaction(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, tra_uuid: string, transaction: TransactionUpdateData): Promise<TransactionEntity | null>;
    deleteTransaction(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, tra_uuid: string): Promise<TransactionEntity | null>;
}