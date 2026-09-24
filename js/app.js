import { initializeSidebar } from "./components/sidebar.js";
import { initializeEmployeeDialog } from "./components/employeeDialog.js";
import { initializeEmployeeTableActions } from "./components/employeeTableActions.js";
import { EmployeeService } from "./services/employeeService.js";
import {
  hasStoredEmployees,
  loadEmployees,
  saveEmployees,
} from "./services/storageService.js";
import { sampleEmployees } from "./data/sampleEmployees.js";
import { renderDashboardStatistics } from "./views/dashboardView.js";
import { renderEmployeeTable } from "./views/employeeTableView.js";

initializeSidebar();

const storageExists = hasStoredEmployees();

const initialEmployees = storageExists
  ? loadEmployees()
  : sampleEmployees;

const employeeService = new EmployeeService(initialEmployees);

if (!storageExists) {
  saveEmployees(employeeService.getAll());
}

function renderApplication() {
  renderDashboardStatistics(employeeService.getStatistics());
  renderEmployeeTable(employeeService.getAll());
}

function persistAndRender() {
  saveEmployees(employeeService.getAll());
  renderApplication();
}

const employeeDialog = initializeEmployeeDialog((formData) => {
  const { employeeId, ...employeeData } = formData;

  if (employeeId) {
    employeeService.updateById(employeeId, employeeData);
  } else {
    employeeService.add(employeeData);
  }

  persistAndRender();
});

initializeEmployeeTableActions({
  onEdit(employeeId) {
    const employee = employeeService.findById(employeeId);

    if (employee) {
      employeeDialog?.openForEdit(employee);
    }
  },

  onDelete(employeeId) {
    if (employeeService.removeById(employeeId)) {
      persistAndRender();
    }
  },
});

renderApplication();
