import { Component, OnInit, TemplateRef } from '@angular/core';
import { Employee, EmployeeCadastro } from './model/employee';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public selectedEmployee: Employee = new Employee();
  public modalRef: BsModalRef;
  public title = 'Cadastrar Empregado';
  private idToBeDeleted: number;

  constructor(private http: HttpClient,
              private modalService: BsModalService) {
  }

  public ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.http.get('	http://rest-api-employees.jmborges.site/api/v1/employees')
      .subscribe(res => {
        this.setEmployees(res);
      });
  }

  public onClickEditar(id: string) {
    console.log(id);
    this.selectedEmployee = this.employees.find(e => e.id === id);
    this.title = 'Editar Empregado';
  }

  public onSubmit() {
    const employee: EmployeeCadastro = {
      name: this.selectedEmployee.employee_name,
      age: this.selectedEmployee.employee_age,
      salary: this.selectedEmployee.employee_salary,
      profile_image: this.selectedEmployee.profile_image
    };
    if (this.selectedEmployee.id.length > 0) {
      this.updateEmployee(employee, this.selectedEmployee.id.toString());
    } else {
      this.saveEmployee(employee);
    }
    this.title = 'Cadastrar Empregado';
  }

  public deleteEmployee(id: number) {
    this.http.delete('http://rest-api-employees.jmborges.site/api/v1/delete/' + id.toString())
    .subscribe(() => {
      this.getAll();
    });
  }

  public openModal(template: TemplateRef<any>, id: number) {
    this.idToBeDeleted = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  private setEmployees(array: any) {
    this.employees = array.data;
  }

  private saveEmployee(employee: EmployeeCadastro) {
    this.http.post('http://rest-api-employees.jmborges.site/api/v1/create', employee)
    .subscribe(() => {
      this.selectedEmployee = new Employee();
      this.getAll();
    });
  }

  private updateEmployee(employee: EmployeeCadastro, id: string) {
    this.http.put('http://rest-api-employees.jmborges.site/api/v1/update/' + id, employee)
    .subscribe(() => {
      this.selectedEmployee = new Employee();
      this.getAll();
    });
  }

  public confirm(): void {
    this.deleteEmployee(this.idToBeDeleted);
    this.modalRef.hide();
  }

  public decline(): void {
    this.modalRef.hide();
  }
}
