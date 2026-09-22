export function initializeEmployeeDialog(onSubmit) {
  const dialog = document.getElementById("employee-dialog");
  const form = document.getElementById("employee-form");
  const addButton = document.getElementById("add-employee-button");
  const closeButton = document.getElementById("close-employee-dialog");
  const cancelButton = document.getElementById("cancel-employee-button");

  if (!dialog || !form || !addButton || !closeButton || !cancelButton) {
    return;
  }

  function closeDialog() {
    dialog.close();
    addButton.focus();
  }

  addButton.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const employeeData = Object.fromEntries(formData.entries());

    onSubmit(employeeData);
    closeDialog();
  });

  closeButton.addEventListener("click", closeDialog);
  cancelButton.addEventListener("click", closeDialog);
}
