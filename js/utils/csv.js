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

export function parseEmployeesCsv(text) {
  const rows = parseCsvRows(text);
  const headerIndex = rows.findIndex((row) =>
    row.some((value) => value.trim() !== ""),
  );

  if (headerIndex === -1) {
    throw new Error("The CSV file is empty");
  }

  const expectedHeaders = [
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
  const headers = rows[headerIndex];

  if (
    headers.length !== expectedHeaders.length ||
    headers.some((header, index) => header !== expectedHeaders[index])
  ) {
    throw new Error("The CSV headers are invalid");
  }

  const employees = [];

  for (let index = headerIndex + 1; index < rows.length; index += 1) {
    const row = rows[index];

    if (row.every((value) => value.trim() === "")) {
      continue;
    }

    if (row.length !== expectedHeaders.length) {
      const rowNumber = index + 1;
      throw new Error(`Invalid number of columns on row ${rowNumber}`);
    }

    const [
      id,
      firstName,
      lastName,
      email,
      department,
      jobTitle,
      startDate,
      salary,
      status,
    ] = row;

    const numericSalary = Number(salary);

    if (salary.trim() === "" || !Number.isFinite(numericSalary)) {
      const rowNumber = index + 1;
      throw new Error(`Invalid salary on row ${rowNumber}`);
    }

    employees.push({
      id,
      firstName,
      lastName,
      email,
      department,
      jobTitle,
      startDate,
      salary: numericSalary,
      status,
    });
  }

  return employees;
}
