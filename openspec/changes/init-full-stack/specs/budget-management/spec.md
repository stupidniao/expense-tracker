## ADDED Requirements

### Requirement: Create budget
The system SHALL allow creating a budget for a category and time period with a spending limit.

#### Scenario: Successful budget creation
- **WHEN** a user sends `POST /api/v1/budgets` with category, period type, dates, and limit
- **THEN** the system creates the budget and returns 201

#### Scenario: Overlapping budget
- **WHEN** a user creates a budget for a category/period overlapping an existing one
- **THEN** the system returns 409 Conflict

### Requirement: List budgets with spend
The system SHALL return budgets with computed spent, remaining, and over_budget fields.

#### Scenario: List budgets with spend
- **WHEN** a user calls `GET /api/v1/budgets?month=2024-01`
- **THEN** each budget includes spent, remaining, and over_budget fields

### Requirement: Over-budget detection
The system SHALL flag budgets where spent >= limit.

#### Scenario: Over-budget flag
- **WHEN** a budget's expenses meet or exceed the limit
- **THEN** the response includes over_budget: true

### Requirement: Delete budget
The system SHALL allow deleting a budget without affecting associated expenses.

#### Scenario: Successful deletion
- **WHEN** a user sends `DELETE /api/v1/budgets/{id}`
- **THEN** the system removes the budget and returns 204
