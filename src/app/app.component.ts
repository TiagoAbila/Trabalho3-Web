import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeCadastro } from './model/employee';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Trabalho3-Web';
  public employees: Employee[] = [];
  public selectedEmployee: Employee = new Employee();

  constructor(private http: HttpClient) {
  }

  public ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.http.get('http://dummy.restapiexample.com/api/v1/employees')
      .subscribe(res => {
        this.setEmployees(res);
      });
  }

  public onClickEditar(id: number) {
    console.log(id);
    this.selectedEmployee = this.employees.find(e => e.id === id);
  }

  public onSubmit() {
    const employee: EmployeeCadastro = {
      employee_name: this.selectedEmployee.employee_name,
      employee_age: this.selectedEmployee.employee_age,
      employee_salary: this.selectedEmployee.employee_salary,
      profile_image: this.selectedEmployee.profile_image
    };

    if (this.selectedEmployee.id > 0) {
      

    } else {
      this.saveEmployee(employee);
    }
  }

  private setEmployees(array: any) {
    this.employees = array.data;
  }

  private saveEmployee(employee: EmployeeCadastro){
    this.http.post('http://dummy.restapiexample.com/api/v1/create', employee)
    .subscribe(() => {
      this.getAll();
    });
  }
}
