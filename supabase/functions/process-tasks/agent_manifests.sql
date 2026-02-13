-- SQL to create the agent_manifests table
CREATE TABLE agent_manifests (
  id VARCHAR PRIMARY KEY,
  display_name VARCHAR NOT NULL,
  version VARCHAR NOT NULL,
  description TEXT,
  source VARCHAR,
  intents TEXT[],
  permissions TEXT[],
  rate_limits JSONB,
  compatibility_tag VARCHAR,
  inputs_schema JSONB,
  outputs_schema JSONB,
  confidence_thresholds JSONB,
  audit_logging BOOLEAN DEFAULT TRUE,
  created_by VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample INSERT
INSERT INTO agent_manifests (
  id, display_name, version, description, source, intents, permissions, rate_limits, compatibility_tag, inputs_schema, outputs_schema, confidence_thresholds, audit_logging, created_by, created_at
) VALUES (
  'zeus-001', 'Zeus', '1.0.0', 'Code editing and orchestration agent', 'VSCode', '{"code_review","deploy"}', '{"db:read","db:write"}', '{"requests_per_minute":60,"concurrent_tasks":2}', 'nexus.v1', '{"type":"object","properties":{"task_id":{"type":"string"}},"required":["task_id"]}', '{"type":"object","properties":{"result":{"type":"string"}},"required":["result"]}', '{"default":0.7,"high_risk":0.9}', TRUE, 'system', NOW()
);
