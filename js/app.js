import { initializeSidebar } from "./components/sidebar.js";
import { initializeEmployeeDialog } from "./components/employeeDialog.js";
import { initializeEmployeeTableActions } from "./components/employeeTableActions.js";
import { initializeEmployeeFilters } from "./components/employeeFilters.js";
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

let activeFilters = {
  query: "",
  department: "",
  status: "",
};

const employeeFilters = initializeEmployeeFilters({
  onChange(filters) {
    activeFilters = filters;
    renderFilteredEmployees();
  },
});

if (!storageExists) {
  saveEmployees(employeeService.getAll());
}

function renderFilteredEmployees() {
  const employees = employeeService.filterEmployees(activeFilters);
  renderEmployeeTable(employees);
}

function renderApplication() {
  renderDashboardStatistics(employeeService.getStatistics());

  employeeFilters?.setDepartments(
    employeeService.getDepartments(),
  );

  activeFilters = employeeFilters?.getFilters() ?? activeFilters;

  renderFilteredEmployees();
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
