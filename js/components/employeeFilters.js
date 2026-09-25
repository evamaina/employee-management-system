export function initializeEmployeeFilters({ onChange } = {}) {
  const searchInput = document.getElementById("employee-search");
  const departmentSelect = document.getElementById("department-filter");
  const statusSelect = document.getElementById("status-filter");
  const clearButton = document.getElementById("clear-filters-button");

  if (
    !searchInput ||
    !departmentSelect ||
    !statusSelect ||
    !clearButton ||
    typeof onChange !== "function"
  ) {
    return;
  }

  function getFilters() {
    return {
      query: searchInput.value,
      department: departmentSelect.value,
      status: statusSelect.value,
    };
  }

  function setDepartments(departments) {
    const previousValue = departmentSelect.value;
    departmentSelect.replaceChildren();

    const allDepartmentsOption = document.createElement("option");
    allDepartmentsOption.value = "";
    allDepartmentsOption.textContent = "All departments";
    departmentSelect.append(allDepartmentsOption);

    departments.forEach((department) => {
      const option = document.createElement("option");
      option.value = department;
      option.textContent = department;
      departmentSelect.append(option);
    });

    departmentSelect.value = departments.includes(previousValue)
      ? previousValue
      : "";
  }

  searchInput.addEventListener("input", () => {
    onChange(getFilters());
  });

  departmentSelect.addEventListener("change", () => {
    onChange(getFilters());
  });

  statusSelect.addEventListener("change", () => {
    onChange(getFilters());
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    departmentSelect.value = "";
    statusSelect.value = "";
    onChange(getFilters());
    searchInput.focus();
  });

  return {
    getFilters,
    setDepartments,
  };
}
