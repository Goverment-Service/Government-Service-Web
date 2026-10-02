---
title: Eligibility, Payments & Analytics
icon: CreditCard
order: 2
group: agent2
homeFeatured: true
summary: Agent 2's stage-scoped eligibility and document analysis, plus payments, refunds, installments, and financial analytics.
---

- POST /api/EligibilityAgent/evaluate and /orchestrate: Agent 2 checks eligibility and the current stage's documents, flagging uploads that look unrelated
- POST /api/payments/checkout: Stripe Checkout for online stage fees, alongside bank deposit slips verified by Finance
- GET /api/payments/{id}/ledger: Full ledger for a payment — fee breakdown, partial payments, refund history
- PUT /api/payments/{id}/installment-plan: Split a fee into installments, each payable by card or bank transfer receipt
- POST /api/refunds: Citizen refund request, then approve → process → complete by department-scoped finance staff
- GET /api/analytics/{daily|weekly|monthly|yearly} and POST /api/anomalies/scan: Reports and anomaly flags for review
