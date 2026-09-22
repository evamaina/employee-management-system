export function initializeEmployeeDialog() {
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

  closeButton.addEventListener("click", closeDialog);
  cancelButton.addEventListener("click", closeDialog);
}
