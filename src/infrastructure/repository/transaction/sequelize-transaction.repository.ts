import { TransactionEntity, TransactionUpdateData } from "../../../domain/transaction/transaction.entity";
import { TransactionRepository } from "../../../domain/transaction/transaction.repository";
import { SequelizeTransaction } from "../../model/transaction/transaction.model";
import { SequelizeUser } from "../../model/user/user.model";
import { SequelizeUnit } from "../../model/unit/unit.model";
import { SequelizeFee } from "../../model/fee/fee.model";

export class SequelizeRepository implements TransactionRepository {
    async getTransactions(cmp_uuid: string, usr_uuid?: string, uni_uuid?: string, usruni_uuid?: string, fee_uuid?: string, filters?: any): Promise<TransactionEntity[] | null> {
        try {
            const whereClause: any = { cmp_uuid };
            if (usr_uuid && usr_uuid !== 'null' && usr_uuid !== 'undefined' && usr_uuid !== '') {
                whereClause.usr_uuid = usr_uuid;
            }
            if (uni_uuid && uni_uuid !== 'null' && uni_uuid !== 'undefined' && uni_uuid !== '') {
                whereClause.uni_uuid = uni_uuid;
            }
            if (usruni_uuid && usruni_uuid !== 'null' && usruni_uuid !== 'undefined' && usruni_uuid !== '') {
                whereClause.usruni_uuid = usruni_uuid;
            }
            if (fee_uuid && fee_uuid !== 'null' && fee_uuid !== 'undefined' && fee_uuid !== '') {
                whereClause.fee_uuid = fee_uuid;
            }
            if (filters) {
                if (filters.tra_status) whereClause.tra_status = filters.tra_status;
            }

            const transactions = await SequelizeTransaction.findAll({
                where: whereClause,
                include: [
                    {
                        model: SequelizeUser,
                        as: 'usr',
                        attributes: ['usr_uuid', 'usr_name', 'usr_surname', 'usr_email']
                    },
                    {
                        model: SequelizeUnit,
                        as: 'unit',
                        attributes: ['uni_uuid', 'uni_code', 'uni_category']
                    },
                    {
                        model: SequelizeFee,
                        as: 'fee',
                        attributes: ['fee_uuid', 'fee_period', 'fee_amount']
                    }
                ],
                order: [['tra_createdat', 'DESC']]
            });
            return transactions;
        } catch (error: any) {
            console.error('Error en getTransactionsRepository:', error.message);
            throw error;
        }
    }

    async findTransactionById(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, tra_uuid: string): Promise<TransactionEntity | null> {
        try {
            const transaction = await SequelizeTransaction.findOne({
                where: {
                    cmp_uuid,
                    usr_uuid,
                    uni_uuid,
                    usruni_uuid,
                    fee_uuid,
                    tra_uuid
                }
            });
            return transaction ? (transaction.dataValues as TransactionEntity) : null;
        } catch (error: any) {
            console.error('Error en findTransactionById:', error.message);
            throw error;
        }
    }

    async createTransaction(transaction: TransactionEntity): Promise<TransactionEntity | null> {
        try {
            const { cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid, tra_gatewayid, tra_totalamount, tra_platformfee, tra_recipientamount, tra_status, tra_createdat } = transaction;
            const result = await SequelizeTransaction.create({
                cmp_uuid,
                usr_uuid,
                uni_uuid,
                usruni_uuid,
                fee_uuid,
                tra_uuid,
                tra_gatewayid,
                tra_totalamount,
                tra_platformfee,
                tra_recipientamount,
                tra_status,
                tra_createdat
            });
            if (!result) {
                throw new Error('No se pudo registrar la transacción.');
            }
            return result.dataValues as TransactionEntity;
        } catch (error: any) {
            console.error('Error en createTransaction:', error.message);
            throw error;
        }
    }

    async updateTransaction(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, tra_uuid: string, transaction: TransactionUpdateData): Promise<TransactionEntity | null> {
        try {
            const [updatedCount, [updatedTransaction]] = await SequelizeTransaction.update(
                {
                    tra_gatewayid: transaction.tra_gatewayid,
                    tra_totalamount: transaction.tra_totalamount,
                    tra_platformfee: transaction.tra_platformfee,
                    tra_recipientamount: transaction.tra_recipientamount,
                    tra_status: transaction.tra_status
                },
                {
                    where: {
                        cmp_uuid,
                        usr_uuid,
                        uni_uuid,
                        usruni_uuid,
                        fee_uuid,
                        tra_uuid
                    },
                    returning: true
                }
            );
            if (updatedCount === 0) {
                throw new Error('No se pudo actualizar la transacción.');
            }
            return updatedTransaction.get({ plain: true }) as TransactionEntity;
        } catch (error: any) {
            console.error('Error en updateTransaction:', error.message);
            throw error;
        }
    }

    async deleteTransaction(cmp_uuid: string, usr_uuid: string, uni_uuid: string, usruni_uuid: string, fee_uuid: string, tra_uuid: string): Promise<TransactionEntity | null> {
        try {
            const transaction = await this.findTransactionById(cmp_uuid, usr_uuid, uni_uuid, usruni_uuid, fee_uuid, tra_uuid);
            if (!transaction) {
                throw new Error(`No existe la transacción con ID: ${tra_uuid}`);
            }
            const result = await SequelizeTransaction.destroy({
                where: {
                    cmp_uuid,
                    usr_uuid,
                    uni_uuid,
                    usruni_uuid,
                    fee_uuid,
                    tra_uuid
                }
            });
            if (!result) {
                throw new Error('No se pudo eliminar la transacción.');
            }
            return transaction;
        } catch (error: any) {
            console.error('Error en deleteTransaction:', error.message);
            throw error;
        }
    }
}
