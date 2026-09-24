const STORAGE_KEY = "ems-employees";

export function loadEmployees() {
  try {
    const storedEmployees = localStorage.getItem(STORAGE_KEY);

    if (!storedEmployees) {
      return [];
    }

    const employees = JSON.parse(storedEmployees);
    return Array.isArray(employees) ? employees : [];
  } catch {
    return [];
  }
}

export function saveEmployees(employees) {
  try {
    const serializedEmployees = JSON.stringify(employees);
    localStorage.setItem(STORAGE_KEY, serializedEmployees);
  } catch {
    throw new Error("Unable to save employee data");
  }
}
