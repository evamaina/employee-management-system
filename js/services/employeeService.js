import { Employee } from "../models/Employee.js";

export class EmployeeService {
  #employees = [];

  constructor(initialEmployees = []) {
    initialEmployees.forEach((employeeData) => {
      this.add(employeeData);
    });
  }

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

  getDepartments() {
    const departments = new Set(
      this.#employees.map((employee) => employee.department),
    );

    return [...departments].sort((a, b) => a.localeCompare(b));
  }

  filterEmployees({ query = "", department = "", status = "" } = {}) {
    const normalizedQuery = query.trim().toLowerCase();

    return this.#employees.filter((employee) => {
      const matchesQuery =
        !normalizedQuery ||
        employee.fullName.toLowerCase().includes(normalizedQuery) ||
        employee.email.toLowerCase().includes(normalizedQuery) ||
        employee.jobTitle.toLowerCase().includes(normalizedQuery);
      const matchesDepartment =
        !department || employee.department === department;
      const matchesStatus = !status || employee.status === status;

      return matchesQuery && matchesDepartment && matchesStatus;
    });
  }

  findById(id) {
    return this.#employees.find((employee) => employee.id === id) ?? null;
  }

  updateById(id, updates) {
    const index = this.#employees.findIndex((employee) => employee.id === id);

    if (index === -1) {
      return null;
    }

    const existingEmployee = this.#employees[index];
    const updatedEmployee = new Employee({
      ...existingEmployee,
      ...updates,
      id: existingEmployee.id,
    });

    const emailExists = this.#employees.some(
      (employee, employeeIndex) =>
        employeeIndex !== index && employee.email === updatedEmployee.email,
    );

    if (emailExists) {
      throw new Error("An employee with this email already exists");
    }

    this.#employees[index] = updatedEmployee;
    return updatedEmployee;
  }

  removeById(id) {
    const index = this.#employees.findIndex((employee) => employee.id === id);

    if (index === -1) {
      return false;
    }

    this.#employees.splice(index, 1);
    return true;
  }

  getStatistics() {
    const totalEmployees = this.#employees.length;
    const activeEmployees = this.#employees.filter(
      (employee) => employee.status === "active",
    ).length;
    const departments = new Set(
      this.#employees.map((employee) => employee.department),
    ).size;
    const employeesOnLeave = this.#employees.filter(
      (employee) => employee.status === "on-leave",
    ).length;

    return {
      totalEmployees,
      activeEmployees,
      departments,
      employeesOnLeave,
    };
  }
}
