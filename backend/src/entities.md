# Database Schema Overview

## User Entity
**Table Name:** `users`
**Class:** `User`

### Columns
- `id` (UUID, Primary Key)
- `clerk_id` (String, Unique)
- `email` (String, Unique)
- `first_name` (String, Nullable)
- `last_name` (String, Nullable)
- `is_active` (Boolean, Default: true)
- `created_at` (Date)
- `updated_at` (Date)

### Relationships
- One-to-Many: `memberships` → `OrganizationMembership` (One user can have many organization memberships)

## Organization Entity
**Table Name:** `organizations`
**Class:** `Organization`

### Columns
- `id` (UUID, Primary Key)
- `name` (String, Unique)
- `created_at` (Date)
- `updated_at` (Date)

### Relationships
- One-to-Many: `memberships` → `OrganizationMembership` (One organization can have many memberships)
- One-to-Many: `credentials` → `LoginCredential` (One organization can have many login credentials)

## OrganizationMembership Entity
**Table Name:** `organization_memberships`
**Class:** `OrganizationMembership`

### Columns
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `organization_id` (UUID, Foreign Key)
- `role` (Enum: 'admin' | 'member' | 'patient' | 'vendor' | 'proto-admin' | 'proto-operator', Default: 'member')
- `created_at` (Date)
- `updated_at` (Date)

### Relationships
- Many-to-One: `user` → `User` (Many memberships can belong to one user)
- Many-to-One: `organization` → `Organization` (Many memberships can belong to one organization)
- One-to-Many: `permissions` → `LoginPermission` (One membership can have many login permissions)
- One-to-Many: `granted_permissions` → `LoginPermission` (One membership can grant many login permissions)

## LoginCredential Entity
**Table Name:** `login_credentials`
**Class:** `LoginCredential`

### Columns
- `id` (UUID, Primary Key)
- `organization_id` (UUID, Foreign Key)
- `service_name` (String)
- `username` (String)
- `encrypted_password` (String)
- `created_at` (Date)
- `updated_at` (Date)

### Relationships
- Many-to-One: `organization` → `Organization` (Many credentials can belong to one organization)
- One-to-Many: `permissions` → `LoginPermission` (One credential can have many permissions)

## LoginPermission Entity
**Table Name:** `login_permissions`
**Class:** `LoginPermission`

### Columns
- `id` (UUID, Primary Key)
- `membership_id` (UUID, Foreign Key)
- `credential_id` (UUID, Foreign Key)
- `permission` (Enum: 'view' | 'manage', Default: 'view')
- `granted_by_membership_id` (UUID, Foreign Key, Nullable)
- `created_at` (Date)
- `updated_at` (Date)

### Relationships
- Many-to-One: `membership` → `OrganizationMembership` (Many permissions can belong to one membership)
- Many-to-One: `credential` → `LoginCredential` (Many permissions can belong to one credential)
- Many-to-One: `granted_by_membership` → `OrganizationMembership` (Many permissions can be granted by one membership)

## Workflow Entity
**Table Name:** `workflows`
**Class:** `Workflow`

### Columns
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (String)
- `due_date` (String)
- `created_by` (String)
- `nuance_notes` (String, Nullable)
- `tags` (String Array)
- `usually_takes` (String)
- `task_map` (String Array)
- `workflow_type` (Enum: 'dag' | 'acyclic', Default: 'dag')
- `created_at` (Date)
- `updated_at` (Date)

### Relationships
- One-to-Many: `tasks` → `Task` (One workflow can have many tasks)

## Task Entity
**Table Name:** `tasks`
**Class:** `Task`

### Columns
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (String)
- `type` (Enum: 'administrative' | 'clinical' | 'technical', Default: 'administrative')
- `urgency` (Enum: 'low' | 'medium' | 'high' | 'critical', Default: 'medium')
- `usually_takes` (String)
- `steps` (JSONB)
- `workflow_id` (String, Foreign Key)
- `created_at` (Date)
- `updated_at` (Date)

### Relationships
- Many-to-One: `workflow` → `Workflow` (Many tasks can belong to one workflow) 