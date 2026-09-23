export function initializeEmployeeDialog(onSubmit) {
  const dialog = document.getElementById("employee-dialog");
  const form = document.getElementById("employee-form");
  const errorMessage = document.getElementById("employee-form-error");
  const addButton = document.getElementById("add-employee-button");
  const closeButton = document.getElementById("close-employee-dialog");
  const cancelButton = document.getElementById("cancel-employee-button");

  if (
    !dialog ||
    !form ||
    !errorMessage ||
    !addButton ||
    !closeButton ||
    !cancelButton
  ) {
    return;
  }

  function closeDialog() {
    dialog.close();
    addButton.focus();
  }

  addButton.addEventListener("click", () => {
    form.reset();
    errorMessage.textContent = "";
    errorMessage.hidden = true;
    dialog.showModal();
  });

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

  form.addEventListener("input", () => {
    errorMessage.textContent = "";
    errorMessage.hidden = true;
  });

  closeButton.addEventListener("click", closeDialog);
  cancelButton.addEventListener("click", closeDialog);
}
