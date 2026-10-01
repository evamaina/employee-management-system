import { initializeSidebar } from "./components/sidebar.js";
import { initializeEmployeeDialog } from "./components/employeeDialog.js";
import { initializeEmployeeTableActions } from "./components/employeeTableActions.js";
import { initializeEmployeeFilters } from "./components/employeeFilters.js";
import { initializeEmployeePagination } from "./components/employeePagination.js";
import { initializeEmployeeExport } from "./components/employeeExport.js";
import { initializeEmployeeImport } from "./components/employeeImport.js";
import { EmployeeService } from "./services/employeeService.js";
import {
  hasStoredEmployees,
  loadEmployees,
  saveEmployees,
} from "./services/storageService.js";
import { sampleEmployees } from "./data/sampleEmployees.js";
import { renderDashboardStatistics } from "./views/dashboardView.js";
import { renderEmployeeTable } from "./views/employeeTableView.js";
import { paginate } from "./utils/pagination.js";

initializeSidebar();

const storageExists = hasStoredEmployees();

const initialEmployees = storageExists
  ? loadEmployees()
  : sampleEmployees;

const employeeService = new EmployeeService(initialEmployees);

const PAGE_SIZE = 5;
let currentPage = 1;

let activeFilters = {
  query: "",
  department: "",
  status: "",
  sortBy: "name-asc",
};

const employeeFilters = initializeEmployeeFilters({
  onChange(filters) {
    activeFilters = filters;
    currentPage = 1;
    renderFilteredEmployees();
  },
});

const employeePagination = initializeEmployeePagination({
  onPageChange(page) {
    currentPage = page;
    renderFilteredEmployees();
  },
});

if (!storageExists) {
  saveEmployees(employeeService.getAll());
}

function renderFilteredEmployees() {
  const filteredEmployees =
    employeeService.filterEmployees(activeFilters);

  const pagination = paginate(
    filteredEmployees,
    currentPage,
    PAGE_SIZE,
  );

  currentPage = pagination.currentPage;

  renderEmployeeTable(pagination.items);
  employeePagination?.render(pagination);
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

initializeEmployeeImport({
  onImport(employees) {
    if (employees.length === 0) {
      throw new Error("The CSV file contains no employee records");
    }

    employeeService.addMany(employees);
    currentPage = 1;
    persistAndRender();

    const label = employees.length === 1 ? "employee" : "employees";

    window.alert(
      `${employees.length} ${label} imported successfully.`,
    );
  },
});

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

initializeEmployeeExport({
  getEmployees() {
    return employeeService.filterEmployees(activeFilters);
  },
});

renderApplication();
