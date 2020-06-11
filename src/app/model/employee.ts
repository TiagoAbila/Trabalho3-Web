export class Employee {
    public id: number;
    public employee_name: string;
    public employee_salary: string;
    public employee_age: number;
    public profile_image: string;

    public constructor() {
        this.id = 0;
        this.employee_name = '';
        this.employee_salary = '';
        this.employee_age = 0;
        this.profile_image = '';
    }
}

export class EmployeeCadastro {
    public employee_name: string;
    public employee_salary: string;
    public employee_age: number;
    public profile_image: string;
}