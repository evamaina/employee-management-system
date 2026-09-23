export function initializeEmployeeTableActions({ onEdit, onDelete } = {}) {
  const tableBody = document.getElementById("employee-table-body");

  if (
    !tableBody ||
    typeof onEdit !== "function" ||
    typeof onDelete !== "function"
  ) {
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

    const { action, employeeId } = actionButton.dataset;

    if (!employeeId) {
      return;
    }

    if (action === "edit") {
      onEdit(employeeId);
      return;
    }

    if (action === "delete") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this employee?",
      );

      if (confirmed) {
        onDelete(employeeId);
      }
    }
  });
}
