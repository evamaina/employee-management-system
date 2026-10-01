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

  addMany(employeeDataList) {
    if (!Array.isArray(employeeDataList)) {
      throw new Error("Employee import data must be an array");
    }

    const newEmployees = employeeDataList.map(
      (employeeData) => new Employee(employeeData),
    );
    const existingEmails = new Set(
      this.#employees.map((employee) => employee.email),
    );
    const existingIds = new Set(
      this.#employees.map((employee) => employee.id),
    );
    const importedEmails = new Set();
    const importedIds = new Set();

    for (const employee of newEmployees) {
      if (
        existingEmails.has(employee.email) ||
        importedEmails.has(employee.email)
      ) {
        throw new Error(`An employee with email ${employee.email} already exists`);
      }

      if (existingIds.has(employee.id) || importedIds.has(employee.id)) {
        throw new Error(`An employee with ID ${employee.id} already exists`);
      }

      importedEmails.add(employee.email);
      importedIds.add(employee.id);
    }

    this.#employees.push(...newEmployees);
    return [...newEmployees];
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

  filterEmployees({
    query = "",
    department = "",
    status = "",
    sortBy = "name-asc",
  } = {}) {
    const normalizedQuery = query.trim().toLowerCase();

    const filteredEmployees = this.#employees.filter((employee) => {
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

    filteredEmployees.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.fullName.localeCompare(b.fullName);
        case "name-desc":
          return b.fullName.localeCompare(a.fullName);
        case "date-asc":
          return a.startDate.localeCompare(b.startDate);
        case "date-desc":
          return b.startDate.localeCompare(a.startDate);
        default:
          return a.fullName.localeCompare(b.fullName);
      }
    });

    return filteredEmployees;
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
