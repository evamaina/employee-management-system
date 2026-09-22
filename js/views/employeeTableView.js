export function renderEmployeeTable(employees) {
  const tableBody = document.getElementById("employee-table-body");

  if (!tableBody) {
    return;
  }

  tableBody.replaceChildren();

  if (employees.length === 0) {
    const row = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 6;
    emptyCell.className = "table-empty";
    emptyCell.textContent = "No employees found.";
    row.append(emptyCell);
    tableBody.append(row);
    return;
  }

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
    const statusBadge = document.createElement("span");
    statusBadge.className = `status-badge status-${employee.status}`;
    statusBadge.textContent = employee.status.replaceAll("-", " ");
    statusCell.append(statusBadge);

    const startDateCell = document.createElement("td");
    startDateCell.textContent = employee.startDate;

    const actionsCell = document.createElement("td");
    const actions = document.createElement("div");
    actions.className = "table-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "action-button action-button-edit";
    editButton.textContent = "Edit";
    editButton.setAttribute("aria-label", `Edit ${employee.fullName}`);
    editButton.dataset.action = "edit";
    editButton.dataset.employeeId = employee.id;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "action-button action-button-delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${employee.fullName}`);
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.employeeId = employee.id;

    actions.append(editButton, deleteButton);
    actionsCell.append(actions);

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
