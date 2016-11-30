/**
 * Created by admin on 28.11.2016 г..
 */
/* globals module */
'use strict';

class Person {
    constructor(firstName, lastName, age, gender) {

        // TODO validate here
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
        this._gender = gender;
    }

    get FirstName() {
        return this._firstName;
    }

    get LastName() {
        return this._lastName;
    }

    get FullName() {
        return this._firstName + ' ' + this._lastName;
    }

    get Age() {
        return this._age;
    }

    get Gender() {
        return this._gender;
    }

}

module.exports.Person = Person;
