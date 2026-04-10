## ADDED Requirements

### Requirement: Mini-app authentication flow
The mini-app SHALL provide login and registration pages with token storage.

#### Scenario: Login success
- **WHEN** a user enters valid credentials and taps Login
- **THEN** the app stores the access token and navigates to the Home tab

### Requirement: Home tab monthly overview
The mini-app SHALL display a Home tab with current month total spend and budget progress cards.

#### Scenario: Home loads monthly data
- **WHEN** a user opens the Home tab
- **THEN** total spend and budget cards are fetched and rendered

### Requirement: Add expense page
The mini-app SHALL provide an Add Expense page with amount, date, category, and note fields.

#### Scenario: Quick add expense
- **WHEN** a user fills and submits the add expense form
- **THEN** the expense is created and the user is returned to the previous page

### Requirement: Expenses tab history list
The mini-app SHALL display a chronologically grouped expense list with infinite scroll.

#### Scenario: Infinite scroll
- **WHEN** a user scrolls to the bottom of the expense list
- **THEN** the next page of expenses is fetched and appended

### Requirement: Budgets tab
The mini-app SHALL display budget cards with progress bars and over-budget indicators.

#### Scenario: Over-budget card
- **WHEN** a budget is exceeded
- **THEN** its card shows a red progress bar and Over Budget label

### Requirement: Account tab and logout
The mini-app SHALL provide an Account tab with logout functionality.

#### Scenario: Logout
- **WHEN** a user taps Logout
- **THEN** tokens are cleared and the app redirects to login
