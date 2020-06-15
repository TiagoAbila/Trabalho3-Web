export class Employee {
    public id: string;
    public employee_name: string;
    public employee_salary: string;
    public employee_age: number;
    public profile_image: string;

    public constructor() {
        this.id = '';
        this.employee_name = '';
        this.employee_salary = '';
        this.employee_age = 0;
        this.profile_image = '';
    }
}

export class EmployeeCadastro {
    public name: string;
    public salary: string;
    public age: number;
    public profile_image: string;
}