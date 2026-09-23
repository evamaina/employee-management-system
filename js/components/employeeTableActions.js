export function initializeEmployeeTableActions(onDelete) {
  const tableBody = document.getElementById("employee-table-body");

  if (!tableBody || typeof onDelete !== "function") {
    return;
  }

  tableBody.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const actionButton = event.target.closest("button[data-action]");

    if (!actionButton) {
      return;
    }

    if (actionButton.dataset.action !== "delete") {
      return;
    }
    const employeeId = actionButton.dataset.employeeId;

    if (!employeeId) {
      return;
}

    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmed) {
      return;
    }
  
    onDelete(actionButton.dataset.employeeId);
    
  });
}
