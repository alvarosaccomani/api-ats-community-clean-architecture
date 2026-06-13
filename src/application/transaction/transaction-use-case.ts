import { TransactionRepository } from "../../domain/transaction/transaction.repository";
import { TransactionValue } from "../../domain/transaction/transaction.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class TransactionUseCase {
    constructor(
        private readonly transactionRepository: TransactionRepository,
    ) {
        this.getTransactions = this.getTransactions.bind(this);
        this.getDetailTransaction = this.getDetailTransaction.bind(this);
        this.createTransaction = this.createTransaction.bind(this);
        this.updateTransaction = this.updateTransaction.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
    }

    public async getTransactions(cmp_uuid: string, usr_uuid?: string, uni_uuid?: string, usruni_uuid?: string, fee_uuid?: string, filters?: any) {
        try {
            const transactions = await this.transactionRepository.getTransactions(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, filters);
            if (!transactions) {
                throw new Error('No hay transacciones.');
            }
            return transactions.map((tra: any) => ({
                cmp_uuid: tra.cmp_uuid,
                usr_uuid: tra.usr_uuid,
                uni_uuid: tra.uni_uuid,
                usruni_uuid: tra.usruni_uuid,
                fee_uuid: tra.fee_uuid,
                tra_uuid: tra.tra_uuid,
                tra_gatewayid: tra.tra_gatewayid,
                tra_totalamount: Number(tra.tra_totalamount),
                tra_platformfee: Number(tra.tra_platformfee),
                tra_recipientamount: Number(tra.tra_recipientamount),
                tra_status: tra.tra_status,
                tra_createdat: TimezoneConverter.toIsoStringInTimezone(tra.tra_createdat, 'America/Buenos_Aires'),
                usr: tra.usr ? {
                    usr_uuid: tra.usr.usr_uuid,
                    usr_name: tra.usr.usr_name,
                    usr_surname: tra.usr.usr_surname,
                    usr_email: tra.usr.usr_email
                } : undefined,
                unit: tra.unit ? {
                    uni_uuid: tra.unit.uni_uuid,
                    uni_code: tra.unit.uni_code,
                    uni_category: tra.unit.uni_category
                } : undefined,
                fee: tra.fee ? {
                    fee_uuid: tra.fee.fee_uuid,
                    fee_period: tra.fee.fee_period,
                    fee_amount: Number(tra.fee.fee_amount)
                } : undefined
            }));
        } catch (error: any) {
            console.error('Error en getTransactions (use case):', error.message);
            throw error;
        }
    }

    public async getDetailTransaction(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, tra_uuid: string) {
        try {
            const tra = await this.transactionRepository.findTransactionById(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid);
            if (!tra) {
                throw new Error(`No hay transacción con ID: ${tra_uuid}`);
            }
            return {
                cmp_uuid: tra.cmp_uuid,
                usr_uuid: tra.usr_uuid,
                uni_uuid: tra.uni_uuid,
                usruni_uuid: tra.usruni_uuid,
                fee_uuid: tra.fee_uuid,
                tra_uuid: tra.tra_uuid,
                tra_gatewayid: tra.tra_gatewayid,
                tra_totalamount: Number(tra.tra_totalamount),
                tra_platformfee: Number(tra.tra_platformfee),
                tra_recipientamount: Number(tra.tra_recipientamount),
                tra_status: tra.tra_status,
                tra_createdat: TimezoneConverter.toIsoStringInTimezone(tra.tra_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailTransaction (use case):', error.message);
            throw error;
        }
    }

    public async createTransaction(body: any) {
        try {
            const traValue = new TransactionValue(body);
            const traCreated = await this.transactionRepository.createTransaction(traValue);
            if (!traCreated) {
                throw new Error('No se pudo registrar la transacción.');
            }
            return {
                cmp_uuid: traCreated.cmp_uuid,
                usr_uuid: traCreated.usr_uuid,
                uni_uuid: traCreated.uni_uuid,
                usruni_uuid: traCreated.usruni_uuid,
                fee_uuid: traCreated.fee_uuid,
                tra_uuid: traCreated.tra_uuid,
                tra_gatewayid: traCreated.tra_gatewayid,
                tra_totalamount: Number(traCreated.tra_totalamount),
                tra_platformfee: Number(traCreated.tra_platformfee),
                tra_recipientamount: Number(traCreated.tra_recipientamount),
                tra_status: traCreated.tra_status,
                tra_createdat: TimezoneConverter.toIsoStringInTimezone(traCreated.tra_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createTransaction (use case):', error.message);
            throw error;
        }
    }

    public async updateTransaction(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, tra_uuid: string, body: any) {
        try {
            const traUpdated = await this.transactionRepository.updateTransaction(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid, body);
            if (!traUpdated) {
                throw new Error('No se pudo actualizar la transacción.');
            }
            return {
                cmp_uuid: traUpdated.cmp_uuid,
                usr_uuid: traUpdated.usr_uuid,
                uni_uuid: traUpdated.uni_uuid,
                usruni_uuid: traUpdated.usruni_uuid,
                fee_uuid: traUpdated.fee_uuid,
                tra_uuid: traUpdated.tra_uuid,
                tra_gatewayid: traUpdated.tra_gatewayid,
                tra_totalamount: Number(traUpdated.tra_totalamount),
                tra_platformfee: Number(traUpdated.tra_platformfee),
                tra_recipientamount: Number(traUpdated.tra_recipientamount),
                tra_status: traUpdated.tra_status,
                tra_createdat: TimezoneConverter.toIsoStringInTimezone(traUpdated.tra_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateTransaction (use case):', error.message);
            throw error;
        }
    }

    public async deleteTransaction(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, tra_uuid: string) {
        try {
            const traDeleted = await this.transactionRepository.deleteTransaction(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid);
            if (!traDeleted) {
                throw new Error('No se pudo eliminar la transacción.');
            }
            return {
                cmp_uuid: traDeleted.cmp_uuid,
                usr_uuid: traDeleted.usr_uuid,
                uni_uuid: traDeleted.uni_uuid,
                usruni_uuid: traDeleted.usruni_uuid,
                fee_uuid: traDeleted.fee_uuid,
                tra_uuid: traDeleted.tra_uuid,
                tra_gatewayid: traDeleted.tra_gatewayid,
                tra_totalamount: Number(traDeleted.tra_totalamount),
                tra_platformfee: Number(traDeleted.tra_platformfee),
                tra_recipientamount: Number(traDeleted.tra_recipientamount),
                tra_status: traDeleted.tra_status,
                tra_createdat: TimezoneConverter.toIsoStringInTimezone(traDeleted.tra_createdat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteTransaction (use case):', error.message);
            throw error;
        }
    }
}
