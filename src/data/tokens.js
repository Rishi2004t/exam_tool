export const validTokens = [
  {
    code: "EDQ-SQL-9F3X-K7Q2",
    createdAt: "2026-05-03T13:45:00.000Z", // Fresh (within 1 hour)
    description: "Active Token 1"
  },
  {
    code: "SQL-EXAM-A8D2-ZX91",
    createdAt: "2026-05-03T13:55:00.000Z", // Fresh
    description: "Active Token 2"
  },
  {
    code: "EDQ-SQL-H5R9-WM3P",
    createdAt: "2026-05-03T12:00:00.000Z", // Expired (> 1 hour ago)
    description: "Expired Token"
  },
  {
    code: "SQL-MASTER-J4K2-L9N1",
    createdAt: new Date().toISOString(), // Guaranteed fresh for current session
    description: "Dynamic Token"
  }
];
