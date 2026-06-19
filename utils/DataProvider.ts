import fs from 'fs';
import {parse} from "csv-parse/sync";

export interface LoginTestData {
    testName: string;
    email: string;
    password: string;
    expected: string;
}

export class DataProvider{
    static getTestDataFromJson<T>(filepath:string):T[]{
        let data = JSON.parse(fs.readFileSync(filepath,'utf-8'));
        return data;
    }

    static getTestDataFromCsv<T>(filepath:string):T[]{
       let data:T[] =  parse(fs.readFileSync(filepath),{columns:true,skip_empty_lines:true});
       return data;
    }
}
