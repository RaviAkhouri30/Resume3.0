import { IPersonDataModel as IPersonDataModel } from "../interfaces/i-person-data-model";

export class PersonDataModel implements IPersonDataModel {
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
    private _hobbies: string[];
    private _awardsAndAchievements: string[];

    constructor(data: IPersonDataModel) {
        // Initialize properties with default values
        this._name = data.name;
        this._email = data.email;
        this._phone = data.phone;
        this._jobTitle = data.jobTitle;
        this._address = data.address;
        this._city = data.city;
        this._state = data.state;
        this._zip = data.zip;
        this._country = data.country;
        this._summary = data.summary;
        this._linkedin = data.linkedin;
        this._github = data.github;
        this._twitter = data.twitter;
        this._dateOfBirth = data.dateOfBirth;
        this._profilePic = data.profilePic;
        this._resume = data.resume;
        this._uid = data.uid;
        this._hobbies = data.hobbies;
        this._awardsAndAchievements = data.awardsAndAchievements;
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

    get hobbies(): string[] {
        return this._hobbies;
    }

    set hobbies(value: string[]) {
        this._hobbies = value;
    }

    get awardsAndAchievements(): string[] {
        return this._awardsAndAchievements;
    }

    set awardsAndAchievements(value: string[]) {
        this._awardsAndAchievements = value;
    }
}
