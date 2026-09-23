import { initializeSidebar } from "./components/sidebar.js";
import { initializeEmployeeDialog } from "./components/employeeDialog.js";
import { initializeEmployeeTableActions } from "./components/employeeTableActions.js";
import { EmployeeService } from "./services/employeeService.js";
import { sampleEmployees } from "./data/sampleEmployees.js";
import { renderDashboardStatistics } from "./views/dashboardView.js";
import { renderEmployeeTable } from "./views/employeeTableView.js";

initializeSidebar();

const employeeService = new EmployeeService();

sampleEmployees.forEach((employeeData) => {
  employeeService.add(employeeData);
});

function renderApplication() {
  renderDashboardStatistics(employeeService.getStatistics());
  renderEmployeeTable(employeeService.getAll());
}

const employeeDialog = initializeEmployeeDialog((formData) => {
  const { employeeId, ...employeeData } = formData;

  if (employeeId) {
    employeeService.updateById(employeeId, employeeData);
  } else {
    employeeService.add(employeeData);
  }

  renderApplication();
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
      renderApplication();
    }
  },
});

renderApplication();
