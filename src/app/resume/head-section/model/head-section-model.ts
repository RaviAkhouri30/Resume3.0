export class HeadSectionModel {
    private userName: string;
    private designation: string;
    private role: string;

    constructor() {
        this.userName = '';
        this.designation = '';
        this.role = '';
    }

    public getUserName(): string {
        return this.userName;
    }

    public setUserName(userName: string): void {
        this.userName = userName;
    }

    public getDesignation(): string {
        return this.designation;
    }

    public setDesignation(designation: string): void {
        this.designation = designation;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        this.role = role;
    }

}
