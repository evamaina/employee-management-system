import { Employee } from "../models/Employee.js";

export class EmployeeService {
  #employees = [];

  add(employeeData) {
    const employee = new Employee(employeeData);

    const emailExists = this.#employees.some(
      (existingEmployee) => existingEmployee.email === employee.email,
    );

    if (emailExists) {
      throw new Error("An employee with this email already exists");
    }

    this.#employees.push(employee);
    return employee;
  }

  getAll() {
    return [...this.#employees];
  }

  findById(id) {
    return this.#employees.find((employee) => employee.id === id) ?? null;
  }
}
