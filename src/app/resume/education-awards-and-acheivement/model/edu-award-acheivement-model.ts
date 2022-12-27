export class EduAwardAcheivementModel {
    private instituteName: string;
    private universityBoard: string;
    private duration: string;
    private stream: string;
    private location: string;
    private grade: string;
    private gradeType: string;

    constructor(data: EduAwardAcheivementModel) {
        this.instituteName = data.instituteName;
        this.universityBoard = data.universityBoard;
        this.duration = data.duration;
        this.stream = data.stream;
        this.location = data.location;
        this.grade = data.grade;
        this.gradeType = data.gradeType;
    }

    public getGradeType(): string {
        return this.gradeType;
    }

    public setGradeType(gradeType: string): void {
        this.gradeType = gradeType;
    }

    public getInstituteName(): string {
        return this.instituteName;
    }

    public setInstituteName(instituteName: string): void {
        this.instituteName = instituteName;
    }

    public getUniversityBoard(): string {
        return this.universityBoard;
    }

    public setUniversityBoard(universityBoard: string): void {
        this.universityBoard = universityBoard;
    }

    public getDuration(): string {
        return this.duration;
    }

    public setDuration(duration: string): void {
        this.duration = duration;
    }

    public getStream(): string {
        return this.stream;
    }

    public setStream(stream: string): void {
        this.stream = stream;
    }

    public getLocation(): string {
        return this.location;
    }

    public setLocation(location: string): void {
        this.location = location;
    }

    public getGrade(): string {
        return this.grade;
    }

    public setGrade(grade: string): void {
        this.grade = grade;
    }

}
