export interface CurrencyEntity {
    cur_uuid: string,
    cur_code: string,
    cur_symbol: string,
    cur_name: string,
    cur_description: string,
    cur_image: string,
    cur_createdat: Date,
    cur_updatedat: Date,
}

//Update
export type CurrencyUpdateData = Pick<CurrencyEntity, 'cur_code' | 'cur_symbol' | 'cur_name' | 'cur_description' | 'cur_image'>;