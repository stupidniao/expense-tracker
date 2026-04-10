## ADDED Requirements

### Requirement: Spend summary by period
The system SHALL provide total spend broken down by category for a date range.

#### Scenario: Monthly summary
- **WHEN** a user calls `GET /api/v1/reports/summary?start_date=2024-01-01&end_date=2024-01-31`
- **THEN** the system returns total spend and per-category breakdown with amounts and percentages

### Requirement: Spend trend over time
The system SHALL provide daily or monthly aggregated spend totals for charting.

#### Scenario: Daily trend
- **WHEN** a user calls `GET /api/v1/reports/trend?granularity=day&start_date=2024-01-01&end_date=2024-01-31`
- **THEN** the system returns an array of date/total objects

### Requirement: CSV export
The system SHALL allow exporting expenses for a date range as a CSV file.

#### Scenario: Successful export
- **WHEN** a user calls `GET /api/v1/reports/export?start_date=2024-01-01&end_date=2024-12-31`
- **THEN** the system streams a CSV with date, amount, category, note columns
