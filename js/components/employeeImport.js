import { parseEmployeesCsv } from "../utils/csv.js";

export function initializeEmployeeImport({ onImport } = {}) {
  const importButton = document.getElementById("import-employees-button");
  const fileInput = document.getElementById("import-employees-input");

  if (!importButton || !fileInput || typeof onImport !== "function") {
    return;
  }

  importButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];

    if (!file) {
      return;
    }

    try {
      const csvText = await file.text();
      const employees = parseEmployeesCsv(csvText);
      await onImport(employees);
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Unable to import employee data",
      );
    } finally {
      fileInput.value = "";
    }
  });
}
