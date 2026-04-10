## ADDED Requirements

### Requirement: Create expense
The system SHALL allow an authenticated user to create an expense with amount, date, category, note (optional), and receipt image (optional).

#### Scenario: Successful expense creation
- **WHEN** a user submits a valid expense to `POST /api/v1/expenses`
- **THEN** the system persists the record and returns 201 with the created expense

#### Scenario: Missing required fields
- **WHEN** a user submits an expense without amount or date
- **THEN** the system returns 422 with field-level validation errors

### Requirement: List expenses
The system SHALL allow filtering by date range, category, and pagination.

#### Scenario: List with date range
- **WHEN** a user calls `GET /api/v1/expenses?start_date=2024-01-01&end_date=2024-01-31`
- **THEN** the system returns only expenses within that date range, sorted by date descending

### Requirement: Update expense
The system SHALL allow partial updates to owned expenses.

#### Scenario: Successful update
- **WHEN** a user sends `PATCH /api/v1/expenses/{id}`
- **THEN** the system applies the changes and returns 200

#### Scenario: Unauthorized update
- **WHEN** a user tries to update another user's expense
- **THEN** the system returns 404

### Requirement: Delete expense
The system SHALL allow deleting owned expenses.

#### Scenario: Successful deletion
- **WHEN** a user sends `DELETE /api/v1/expenses/{id}` for their own expense
- **THEN** the system removes the record and returns 204
