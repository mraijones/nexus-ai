-- Migration file for setting up roles, role_personas, and account_roles tables with constraints

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE role_personas (
    id SERIAL PRIMARY KEY,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    persona VARCHAR(100) NOT NULL,
    is_immutable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(role_id, persona)
);

CREATE TABLE account_roles (
    id SERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    locked_in TIMESTAMP,
    CHECK (locked_in IS NULL OR locked_in >= NOW() + INTERVAL '30 days'),
    UNIQUE(account_id, role_id)
);

-- Audit logging for Tier 4 roles
CREATE TRIGGER audit_logging_tier_4
AFTER INSERT OR UPDATE ON account_roles
FOR EACH ROW
EXECUTE PROCEDURE log_changes();

-- Function to log changes --
CREATE OR REPLACE FUNCTION log_changes() RETURNS TRIGGER AS $$
BEGIN
    -- Insert audit log into your audit table here, e.g., audit_logs
    -- You may need to create an audit_logs table and define its structure according to your needs
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;