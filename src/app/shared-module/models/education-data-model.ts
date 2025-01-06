import { IEducationDataModel } from "../interfaces/i-education-data-model";

/**
 * Represents the education data model.
 * Implements the IEducationDataModel interface.
 */
export class EducationDataModel implements IEducationDataModel {
    /**
     * The unique identifier for the person.
     * @private
     */
    private _personUid: string;

    /**
     * The unique identifier for the education record.
     * @private
     */
    private _uid: string;

    /**
     * The degree obtained by the person.
     * @private
     */
    private _degree: string;

    /**
     * The major field of study.
     * @private
     */
    private _major: string;

    /**
     * The university where the degree was obtained.
     * @private
     */
    private _university: string;

    /**
     * The name of the institute.
     * @private
     */
    private _instituteName: string;

    /**
     * The year of graduation.
     * @private
     */
    private _graduationYear: string;

    /**
     * The grade obtained.
     * @private
     */
    private _grade: string;

    /**
     * Creates an instance of EducationDataModel.
     * @param data - The education data.
     */
    constructor(data: IEducationDataModel) {
        // Initailize the variables
        this._personUid = data.personUid;
        this._uid = data.uid;
        this._degree = data.degree;
        this._major = data.major;
        this._university = data.university;
        this._instituteName = data.instituteName;
        this._graduationYear = data.graduationYear;
        this._grade = data.grade;
    }

    /** Gets the unique identifier for the person. */
    get personUid(): string {
        return this._personUid;
    }

    /** Gets the unique identifier for the education record. */
    get uid(): string {
        return this._uid;
    }

    /** Gets the degree obtained by the person. */
    get degree(): string {
        return this._degree;
    }

    /** Sets the degree obtained by the person. */
    set degree(value: string) {
        this._degree = value;
    }

    /** Gets the major field of study. */
    get major(): string {
        return this._major;
    }

    /** Sets the major field of study. */
    set major(value: string) {
        this._major = value;
    }

    /** Gets the university where the degree was obtained. */
    get university(): string {
        return this._university;
    }

    /** Sets the university where the degree was obtained. */
    set university(value: string) {
        this._university = value;
    }

    /** Gets the name of the institute. */
    get instituteName(): string {
        return this._instituteName;
    }

    /** Sets the name of the institute. */
    set instituteName(value: string) {
        this._instituteName = value;
    }

    /** Gets the year of graduation. */
    get graduationYear(): string {
        return this._graduationYear;
    }

    /** Sets the year of graduation. */
    set graduationYear(value: string) {
        this._graduationYear = value;
    }

    /** Gets the grade obtained. */
    get grade(): string {
        return this._grade;
    }

    /** Sets the grade obtained. */
    set grade(value: string) {
        this._grade = value;
    }

}
