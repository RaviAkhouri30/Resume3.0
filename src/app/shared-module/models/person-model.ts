import { IPerson } from "../interfaces/i-person-model";

export class PersonModel implements IPerson {
    // Private properties
    private _name: string;
    private _email: string;
    private _phone: string;
    private _jobTitle: string;
    private _address: string;
    private _city: string;
    private _state: string;
    private _zip: string;
    private _country: string;
    private _summary: string;
    private _linkedin: string;
    private _github: string;
    private _twitter: string;
    private _dateOfBirth: string;
    private _profilePic: string;
    private _resume: string;
    private _uid: string;
    private _skills: string[];

    constructor() {
        // Initialize properties with default values
        this._name = '';
        this._email = '';
        this._phone = '';
        this._jobTitle = ''
        this._address = '';
        this._city = '';
        this._state = '';
        this._zip = '';
        this._country = '';
        this._summary = '';
        this._linkedin = '';
        this._github = '';
        this._twitter = '';
        this._dateOfBirth = '';
        this._profilePic = '';
        this._resume = '';
        this._uid = '';
        this._skills = [];
    }

    // Getter and setter methods for each property
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }

    get jobTitle(): string {
        return this._jobTitle;
    }

    set jobTitle(value: string) {
        this._jobTitle = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get state(): string {
        return this._state;
    }

    set state(value: string) {
        this._state = value;
    }

    get zip(): string {
        return this._zip;
    }

    set zip(value: string) {
        this._zip = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get summary(): string {
        return this._summary;
    }

    set summary(value: string) {
        this._summary = value;
    }

    get linkedin(): string {
        return this._linkedin;
    }

    set linkedin(value: string) {
        this._linkedin = value;
    }

    get github(): string {
        return this._github;
    }

    set github(value: string) {
        this._github = value;
    }

    get twitter(): string {
        return this._twitter;
    }

    set twitter(value: string) {
        this._twitter = value;
    }

    get dateOfBirth(): string {
        return this._dateOfBirth;
    }

    set dateOfBirth(value: string) {
        this._dateOfBirth = value;
    }

    get profilePic(): string {
        return this._profilePic;
    }

    set profilePic(value: string) {
        this._profilePic = value;
    }

    get resume(): string {
        return this._resume;
    }

    set resume(value: string) {
        this._resume = value;
    }

    get uid(): string {
        return this._uid;
    }

    set uid(value: string) {
        this._uid = value;
    }

    get skills(): string[] {
        return this._skills;
    }

    set skills(value: string[]) {
        this._skills = value;
    }
}
