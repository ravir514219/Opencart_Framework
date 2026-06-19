import { faker } from "@faker-js/faker";

export class TestDataUtils{

    static getFirstName(){
        return faker.person.firstName();
    }
    static getLastName(){
        return faker.person.lastName();
    }
    static getEmail(){
        return faker.internet.email();
    }
    static getPhoneNumber(){
        return faker.phone.number();
    }
    static getPassword(length:number = 10){
        return faker.internet.password({length});
    }
}