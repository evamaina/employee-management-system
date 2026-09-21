export function renderDashboardStatistics(statistics) {
  const totalEmployeesElement = document.getElementById("total-employees-count");
  const activeEmployeesElement = document.getElementById("active-employees-count");
  const departmentsElement = document.getElementById("departments-count");
  const employeesOnLeaveElement = document.getElementById(
    "employees-on-leave-count",
  );

  if (
    !totalEmployeesElement ||
    !activeEmployeesElement ||
    !departmentsElement ||
    !employeesOnLeaveElement
  ) {
    return;
  }

  totalEmployeesElement.textContent = statistics.totalEmployees;
  activeEmployeesElement.textContent = statistics.activeEmployees;
  departmentsElement.textContent = statistics.departments;
  employeesOnLeaveElement.textContent = statistics.employeesOnLeave;
}
