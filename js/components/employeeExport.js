import { createEmployeesCsv } from "../utils/csv.js";

export function initializeEmployeeExport({ getEmployees } = {}) {
  const exportButton = document.getElementById("export-employees-button");

  if (!exportButton || typeof getEmployees !== "function") {
    return;
  }

  exportButton.addEventListener("click", () => {
    const employees = getEmployees();

    if (employees.length === 0) {
      window.alert("No employees to export.");
      return;
    }

    const csv = createEmployeesCsv(employees);
    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "employees.csv";

    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });
}
