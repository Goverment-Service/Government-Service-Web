---
title: Eligibility, Payments & Analytics
icon: CreditCard
order: 2
group: agent2
homeFeatured: true
summary: Agent 2's eligibility and document analysis, plus payments, refunds, installments, and financial analytics.
---

- POST /api/EligibilityAgent/evaluate and /orchestrate: Agent 2 checks eligibility and missing documents, then runs the pipeline
- POST /api/payments/checkout: Stripe Checkout for online fees, alongside bank deposit-slip and online-reference payments
- GET /api/payments/{id}/ledger: Full ledger for a payment — fee breakdown, partial payments, refund history
- PUT /api/payments/{id}/installment-plan: Split a fee into installments, monitored by a background service
- POST /api/refunds: Citizen refund request, then approve → process → complete by finance staff
- GET /api/analytics/{daily|weekly|monthly|yearly} and POST /api/analytics/anomaly-detection: Reports and anomaly flags for review
