## ADDED Requirements

### Requirement: Authentication pages
The web app SHALL provide Login and Register pages with redirect logic.

#### Scenario: Login redirect
- **WHEN** an unauthenticated user navigates to a protected route
- **THEN** the app redirects to /login

### Requirement: Dashboard page
The web app SHALL display monthly total spend, budget progress bars, and a 30-day trend chart.

#### Scenario: Dashboard loads data
- **WHEN** an authenticated user visits /dashboard
- **THEN** the app fetches and displays the monthly summary, budget statuses, and trend chart

### Requirement: Expense list and form
The web app SHALL provide a paginated expense table with filters and a create/edit form modal.

#### Scenario: Create expense
- **WHEN** a user submits the expense form
- **THEN** the expense is saved and the list refreshes

### Requirement: Responsive layout
The web app SHALL be usable on screens from 375px (mobile) to 1920px (desktop).

#### Scenario: Mobile nav
- **WHEN** the viewport is below 768px
- **THEN** the sidebar is hidden and a hamburger menu is shown
