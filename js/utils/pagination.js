export function paginate(items, page = 1, pageSize = 5) {
  const totalItems = items.length;
  const calculatedPages = Math.ceil(totalItems / pageSize);
  const totalPages = Math.max(1, calculatedPages);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  const startItem = totalItems === 0 ? 0 : startIndex + 1;
  const endItem = Math.min(startIndex + pageSize, totalItems);

  return {
    items: paginatedItems,
    currentPage,
    totalPages,
    totalItems,
    startItem,
    endItem,
  };
}
