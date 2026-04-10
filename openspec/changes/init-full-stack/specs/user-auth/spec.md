## ADDED Requirements

### Requirement: User registration
The system SHALL allow a new user to register with an email address and password. The password SHALL be hashed using bcrypt before storage. The system SHALL reject duplicate email addresses.

#### Scenario: Successful registration
- **WHEN** a user submits a valid email and password (min 8 characters)
- **THEN** the system creates the account, returns a 201 response with the user profile, and issues access + refresh tokens

#### Scenario: Duplicate email
- **WHEN** a user registers with an already-registered email
- **THEN** the system returns a 409 Conflict error

#### Scenario: Weak password
- **WHEN** a user registers with a password shorter than 8 characters
- **THEN** the system returns a 422 Unprocessable Entity with validation details

### Requirement: User login
The system SHALL authenticate users via email/password and issue a JWT access token (15-minute TTL) plus a refresh token (7-day TTL) in an httpOnly cookie.

#### Scenario: Successful login
- **WHEN** a user submits valid credentials
- **THEN** the system returns 200 with the user profile and access token; the refresh token is set as an httpOnly cookie

#### Scenario: Invalid credentials
- **WHEN** a user submits wrong email or password
- **THEN** the system returns 401 Unauthorized

### Requirement: Token refresh
The system SHALL issue a new access token when a valid refresh token is presented, with token rotation.

#### Scenario: Valid refresh token
- **WHEN** a client sends `POST /api/v1/auth/refresh` with a valid refresh token cookie
- **THEN** the system returns a new access token and rotates the refresh token

#### Scenario: Expired refresh token
- **WHEN** the refresh token is missing, expired, or already rotated
- **THEN** the system returns 401

### Requirement: Logout
The system SHALL invalidate the refresh token on logout and clear the httpOnly cookie.

#### Scenario: Successful logout
- **WHEN** an authenticated user calls `POST /api/v1/auth/logout`
- **THEN** the refresh token is revoked, the cookie is cleared, and the system returns 204

### Requirement: Protected route enforcement
All non-auth API routes SHALL require a valid Bearer access token. Requests without a valid token SHALL be rejected.

#### Scenario: Missing token
- **WHEN** a request is made without an Authorization header
- **THEN** the system returns 401 Unauthorized

#### Scenario: Expired token
- **WHEN** a request is made with an expired access token
- **THEN** the system returns 401 with an `expired` error code
