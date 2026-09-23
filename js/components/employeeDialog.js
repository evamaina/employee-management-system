export function initializeEmployeeDialog(onSubmit) {
  const dialog = document.getElementById("employee-dialog");
  const form = document.getElementById("employee-form");
  const employeeIdInput = document.getElementById("employee-id");
  const dialogTitle = document.getElementById("employee-dialog-title");
  const saveButton = document.getElementById("save-employee-button");
  const errorMessage = document.getElementById("employee-form-error");
  const addButton = document.getElementById("add-employee-button");
  const closeButton = document.getElementById("close-employee-dialog");
  const cancelButton = document.getElementById("cancel-employee-button");

  if (
    typeof onSubmit !== "function" ||
    !dialog ||
    !form ||
    !employeeIdInput ||
    !dialogTitle ||
    !saveButton ||
    !errorMessage ||
    !addButton ||
    !closeButton ||
    !cancelButton
  ) {
    return;
  }

  const employeeFields = {
    firstName: form.elements.namedItem("firstName"),
    lastName: form.elements.namedItem("lastName"),
    email: form.elements.namedItem("email"),
    department: form.elements.namedItem("department"),
    jobTitle: form.elements.namedItem("jobTitle"),
    startDate: form.elements.namedItem("startDate"),
    salary: form.elements.namedItem("salary"),
    status: form.elements.namedItem("status"),
  };

  if (Object.values(employeeFields).some((field) => !field)) {
    return;
  }

  function closeDialog() {
    dialog.close();
    addButton.focus();
  }

  function clearError() {
    errorMessage.textContent = "";
    errorMessage.hidden = true;
  }

  function openForAdd() {
    form.reset();
    employeeIdInput.value = "";
    dialogTitle.textContent = "Add Employee";
    saveButton.textContent = "Save Employee";
    clearError();
    dialog.showModal();
  }

  function openForEdit(employee) {
    form.reset();
    employeeIdInput.value = employee.id;

    for (const [name, field] of Object.entries(employeeFields)) {
      field.value = employee[name];
    }

    dialogTitle.textContent = "Edit Employee";
    saveButton.textContent = "Save Changes";
    clearError();
    dialog.showModal();
  }

  addButton.addEventListener("click", openForAdd);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const employeeData = Object.fromEntries(formData.entries());

    try {
      onSubmit(employeeData);
      closeDialog();
    } catch (error) {
      errorMessage.textContent =
        error instanceof Error ? error.message : "Unable to save employee";
      errorMessage.hidden = false;
    }
  });

  form.addEventListener("input", clearError);

  closeButton.addEventListener("click", closeDialog);
  cancelButton.addEventListener("click", closeDialog);

  return {
    openForEdit,
  };
}
