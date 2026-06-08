import { v4 as uuid } from "uuid";
import moment from 'moment';
import { CurrencyEntity } from "./currency.entity";

export class CurrencyValue implements CurrencyEntity {
    cur_uuid: string;
    cur_code: string;
    cur_symbol: string;
    cur_name: string;
    cur_description: string;
    cur_image: string;
    cur_createdat: Date;
    cur_updatedat: Date;
    
    constructor({
            cur_uuid,
            cur_code,
            cur_symbol,
            cur_name,
            cur_description,
            cur_image,
            cur_createdat,
            cur_updatedat
        }:{ 
            cur_uuid: string,
            cur_code: string,
            cur_symbol: string,
            cur_name: string,
            cur_description: string,
            cur_image: string,
            cur_createdat?: Date,
            cur_updatedat?: Date
        }) {
        this.cur_uuid = uuid();
        this.cur_code = cur_code;
        this.cur_symbol = cur_symbol;
        this.cur_name = cur_name;
        this.cur_description = cur_description;
        this.cur_image = cur_image;
        this.cur_createdat = cur_createdat ?? moment().toDate();
        this.cur_updatedat = cur_updatedat ?? moment().toDate();
    }
}