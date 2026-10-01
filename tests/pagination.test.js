import test from "node:test";
import assert from "node:assert/strict";
import { paginate } from "../js/utils/pagination.js";

test("returns the requested page of items", () => {
  // Arrange
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Act
  const result = paginate(items, 2, 5);

  // Assert
  assert.deepEqual(result, {
    items: [6, 7, 8, 9, 10],
    currentPage: 2,
    totalPages: 3,
    totalItems: 12,
    startItem: 6,
    endItem: 10,
  });
});

test("returns the last page when the requested page is beyond it", () => {
  // Arrange
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Act
  const result = paginate(items, 99, 5);

  // Assert
  assert.deepEqual(result, {
    items: [11, 12],
    currentPage: 3,
    totalPages: 3,
    totalItems: 12,
    startItem: 11,
    endItem: 12,
  });
});

test("returns page 1 of 1 with no items for an empty array", () => {
  // Arrange
  const items = [];

  // Act
  const result = paginate(items);

  // Assert
  assert.deepEqual(result, {
    items: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    startItem: 0,
    endItem: 0,
  });
});
