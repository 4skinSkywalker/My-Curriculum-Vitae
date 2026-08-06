---
createdBy: 'Fredo'
creatorIcon: 'images/creator-icon.png'
title: 'OWASP Light'
description: "Software security does not have to be complicated. The OWASP Top 10 provides an excellent reference for common web application vulnerabilities..."
pubDate: '2026-08-06'
type: 'post'
tags: ['security', 'coding']
---

# OWASP Light

While the **[OWASP Top 10](https://owasp.org/Top10/2025/)** provides a good overview of the most critical web application security risks, my "OWASP Light" guide focuses on the essential security practices that deliver the greatest impact with minimal complexity.

---

# 1. Never Trust External Inputs

Every piece of data coming from outside (users, APIs or third-party services) should always alidated in its type, length, and format.

Proper input validation helps prevent vulnerabilities such as SQL Injection, Cross-Site Scripting (XSS), and Command Injection.

---

# 2. Always Use Parameterized Queries

Database queries should never be built by concatenating external inputs.

**Good**

```sql
SELECT * FROM users WHERE id = ?;
```

**Bad**

```sql
"SELECT * FROM users WHERE id = " + userInput;
```

Parameterized queries are sanitized by the driver, effectively eliminating one of the most common attack vectors.

---

# 3. Protect Authentication and Passwords

Authentication is the most sensitive part of any app.

Follow these best practices:

* Store passwords using strong hashing algorithms;
* Enable Multi-Factor Authentication (MFA) when possible;
* Expire inactive sessions;
* Never store or transmit passwords in plain text.

---

# 4. Verify Authorization on Every Request

Authentication only identifies who the user is.

Authorization determines what the user can do.

Every endpoint should verify that the authenticated user has permission to access the requested resource. Never rely on client-side controls or hidden interface elements.

---

# 5. Protect Sensitive Information

Applications should never expose implementation details.

NEVER expose the following:

* Stack traces;
* SQL error messages;
* API keys;
* Authentication tokens;
* Passwords;
* Infrastructure details.

Users should receive generic error messages, while detailed information should only be available in secure application logs.

---

# 6. Secure Data in Transit and at Rest

Sensitive information should remain protected throughout its lifecycle.

* Enforce HTTPS for all connections;
* Encrypt sensitive data stored in DBs;
* Store secrets outside the source code;
* Rotate credentials and encryption keys regularly.

---

# 7. Keep Dependencies Updated

Applications are only as secure as the libraries they depend on.

* Update third-party packages;
* Remove unused dependencies;
* Monitor known vulnerabilities.

---

# 8. Log Security-Relevant Events

Logging is essential for detecting and investigating security incidents.

At a minimum, record:

* Successful and failed login attempts;
* Password changes;
* Permission changes;
* Administrative actions;
* Security-related errors.

Logs should be protected against unauthorized modification or deletion.

---

# 9. The Principle of Least Privilege

Every user, service, and process should have only the permissions required to perform its intended function.

Limiting privileges reduces the potential impact of compromised accounts or services.
