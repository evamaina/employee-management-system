export function renderEmployeeTable(employees) {
  const tableBody = document.getElementById("employee-table-body");

  if (!tableBody) {
    return;
  }

  tableBody.replaceChildren();

  employees.forEach((employee) => {
    const row = document.createElement("tr");

    const employeeCell = document.createElement("td");
    const fullName = document.createElement("p");
    fullName.className = "employee-name";
    fullName.textContent = employee.fullName;

    const email = document.createElement("p");
    email.className = "employee-email";
    email.textContent = employee.email;
    employeeCell.append(fullName, email);

    const departmentCell = document.createElement("td");
    departmentCell.textContent = employee.department;

    const jobTitleCell = document.createElement("td");
    jobTitleCell.textContent = employee.jobTitle;

    const statusCell = document.createElement("td");
    statusCell.textContent = employee.status;

    const startDateCell = document.createElement("td");
    startDateCell.textContent = employee.startDate;

    const actionsCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.dataset.action = "edit";
    editButton.dataset.employeeId = employee.id;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.employeeId = employee.id;

    actionsCell.append(editButton, deleteButton);

    row.append(
      employeeCell,
      departmentCell,
      jobTitleCell,
      statusCell,
      startDateCell,
      actionsCell,
    );
    tableBody.append(row);
  });
}
