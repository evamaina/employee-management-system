import { initializeSidebar } from "./components/sidebar.js";
import { EmployeeService } from "./services/employeeService.js";
import { sampleEmployees } from "./data/sampleEmployees.js";
import { renderDashboardStatistics } from "./views/dashboardView.js";
import { renderEmployeeTable } from "./views/employeeTableView.js";

initializeSidebar();

const employeeService = new EmployeeService();

sampleEmployees.forEach((employeeData) => {
  employeeService.add(employeeData);
});

const statistics = employeeService.getStatistics();
renderDashboardStatistics(statistics);
renderEmployeeTable(employeeService.getAll());
