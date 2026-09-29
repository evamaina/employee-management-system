function escapeCsvValue(value) {
  const stringValue = String(value ?? "");
  const escapedValue = stringValue.replaceAll('"', '""');
  return `"${escapedValue}"`;
}

export function createEmployeesCsv(employees) {
  const headers = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Department",
    "Job Title",
    "Start Date",
    "Salary",
    "Status",
  ];

  const rows = employees.map((employee) => [
    employee.id,
    employee.firstName,
    employee.lastName,
    employee.email,
    employee.department,
    employee.jobTitle,
    employee.startDate,
    employee.salary,
    employee.status,
  ]);

  return [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");
}

export function parseCsvRows(text) {
  const csvText = text.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let field = "";
  let insideQuotes = false;
  let rowStarted = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];

    if (
      !insideQuotes &&
      (character === "\n" || character === "\r")
    ) {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      rowStarted = false;

      if (character === "\r" && csvText[index + 1] === "\n") {
        index += 1;
      }

      continue;
    }

    rowStarted = true;

    if (character === '"') {
      if (insideQuotes && csvText[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (character === "," && !insideQuotes) {
      row.push(field);
      field = "";
    } else {
      field += character;
    }
  }

  if (insideQuotes) {
    throw new Error("Invalid CSV: unterminated quoted field");
  }

  if (rowStarted) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}
