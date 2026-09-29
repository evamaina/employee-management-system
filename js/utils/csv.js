function escapeCsvValue(value) {
  const stringValue = String(value ?? "");
  const escapedValue = stringValue.replaceAll('"', '""');
  return `"${escapedValue}"`;
}

export function createEmployeesCsv(employees) {
  const headers = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Department",
    "Job Title",
    "Start Date",
    "Salary",
    "Status",
  ];

  const rows = employees.map((employee) => [
    employee.id,
    employee.firstName,
    employee.lastName,
    employee.email,
    employee.department,
    employee.jobTitle,
    employee.startDate,
    employee.salary,
    employee.status,
  ]);

  return [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");
}
