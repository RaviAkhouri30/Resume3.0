export class ExperienceModel {
    private companyName: string;
    private tenure: string;
    private desc: string;
    private uid: string;

    constructor(data: ExperienceModel) {
        this.companyName = data.companyName;
        this.tenure = data.tenure;
        this.desc = data.desc;
        this.uid = data.uid;
    }

    public getCompanyName(): string {
        return this.companyName;
    }

    public setCompanyName(companyName: string): void {
        this.companyName = companyName;
    }

    public getTenure(): string {
        return this.tenure;
    }

    public setTenure(tenure: string): void {
        this.tenure = tenure;
    }

    public getDesc(): string {
        return this.desc;
    }

    public setDesc(desc: string): void {
        this.desc = desc;
    }

    public getUid(): string {
        return this.uid;
    }

    public setUid(uid: string): void {
        this.uid = uid;
    }

}
