import { IProfessionalSkillsDataModel } from "../interfaces/i-professional-skills";

export class ProfessionalSkillsDataModel implements IProfessionalSkillsDataModel {
    private _personUid: string;
    private _uid: string;
    private _skill: string;
    private _proficeincy: number;

    constructor(data: IProfessionalSkillsDataModel) {
        this._personUid = data.personUid;
        this._uid = data.uid;
        this._skill = data.skill;
        this._proficeincy = data.proficeincy;
    }

    /**
     * Getter for _personUid
     * @returns {string} The person UID
     */
    public get personUid(): string {
        return this._personUid;
    }

    /**
     * Getter for _uid
     * @returns {string} The UID
     */
    public get uid(): string {
        return this._uid;
    }

    /**
     * Getter for _skill
     * @returns {string} The skill
     */
    public get skill(): string {
        return this._skill;
    }

    /**
     * Setter for _skill
     * @param {string} value - The new skill
     */
    public set skill(value: string) {
        this._skill = value;
    }

    /**
     * Getter for _proficeincy
     * @returns {number} The proficiency
     */
    public get proficeincy(): number {
        return this._proficeincy;
    }

    /**
     * Setter for _proficeincy
     * @param {number} value - The new proficiency
     */
    public set proficeincy(value: number) {
        this._proficeincy = value;
    }

}
