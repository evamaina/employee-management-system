export function initializeEmployeePagination({ onPageChange } = {}) {
  const resultsSummary = document.getElementById("employee-results-summary");
  const pageIndicator = document.getElementById("page-indicator");
  const previousButton = document.getElementById("previous-page-button");
  const nextButton = document.getElementById("next-page-button");

  if (
    !resultsSummary ||
    !pageIndicator ||
    !previousButton ||
    !nextButton ||
    typeof onPageChange !== "function"
  ) {
    return;
  }

  let currentPage = 1;

  function renderPagination(pagination) {
    currentPage = pagination.currentPage;
    const { totalPages, totalItems, startItem, endItem } = pagination;

    resultsSummary.textContent =
      totalItems === 0
        ? "Showing 0 employees"
        : `Showing ${startItem}–${endItem} of ${totalItems} employees`;

    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  previousButton.addEventListener("click", () => {
    onPageChange(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    onPageChange(currentPage + 1);
  });

  return {
    render: renderPagination,
  };
}
