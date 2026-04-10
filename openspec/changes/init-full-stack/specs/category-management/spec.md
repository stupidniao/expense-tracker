## ADDED Requirements

### Requirement: Create category
The system SHALL allow creating custom categories with name, icon, and color.

#### Scenario: Successful category creation
- **WHEN** a user sends `POST /api/v1/categories` with a unique name
- **THEN** the system creates the category and returns 201

#### Scenario: Duplicate category name
- **WHEN** a user creates a category with a name that already exists for their account
- **THEN** the system returns 409 Conflict

### Requirement: List categories
The system SHALL return all categories belonging to the authenticated user, sorted alphabetically.

#### Scenario: List own categories
- **WHEN** a user calls `GET /api/v1/categories`
- **THEN** the system returns the user's categories sorted by name

### Requirement: Update category
The system SHALL allow updating name, icon, or color.

#### Scenario: Successful update
- **WHEN** a user sends `PATCH /api/v1/categories/{id}`
- **THEN** the system applies the changes and returns 200

### Requirement: Delete category
The system SHALL allow deleting a category only if no expenses are currently assigned to it.

#### Scenario: Delete unused category
- **WHEN** a user deletes a category with zero associated expenses
- **THEN** the system returns 204

#### Scenario: Delete category with expenses
- **WHEN** a user tries to delete a category that has expenses
- **THEN** the system returns 409

### Requirement: Seed default categories
The system SHALL seed default categories for new users upon registration.

#### Scenario: New user default categories
- **WHEN** a new user registers
- **THEN** the system creates the default category set (Food, Transport, Shopping, Entertainment, Health, Other)
