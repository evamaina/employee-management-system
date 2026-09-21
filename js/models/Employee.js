export class Employee {
  constructor({
    id = crypto.randomUUID(),
    firstName,
    lastName,
    email,
    department,
    jobTitle,
    startDate,
    salary = 0,
    status = "active",
  }) {
    if (typeof firstName !== "string" || firstName.trim() === "") {
      throw new Error("First name is required");
    }

    if (typeof lastName !== "string" || lastName.trim() === "") {
      throw new Error("Last name is required");
    }

    if (typeof email !== "string" || email.trim() === "") {
      throw new Error("Email is required");
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.includes("@")) {
      throw new Error("Email must contain @");
    }

    if (typeof department !== "string" || department.trim() === "") {
      throw new Error("Department is required");
    }

    if (typeof jobTitle !== "string" || jobTitle.trim() === "") {
      throw new Error("Job title is required");
    }

    if (typeof startDate !== "string" || startDate.trim() === "") {
      throw new Error("Start date is required");
    }

    if (
      (typeof salary !== "number" && typeof salary !== "string") ||
      (typeof salary === "string" && salary.trim() === "")
    ) {
      throw new Error("Salary must be a valid number");
    }

    const numericSalary = Number(salary);

    if (!Number.isFinite(numericSalary)) {
      throw new Error("Salary must be a valid number");
    }

    if (numericSalary < 0) {
      throw new Error("Salary cannot be negative");
    }

    if (!["active", "inactive", "on-leave"].includes(status)) {
      throw new Error("Status must be active, inactive, or on-leave");
    }

    this.id = id;
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
    this.email = normalizedEmail;
    this.department = department.trim();
    this.jobTitle = jobTitle.trim();
    this.startDate = startDate.trim();
    this.salary = numericSalary;
    this.status = status;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get initials() {
    return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase();
  }
}
