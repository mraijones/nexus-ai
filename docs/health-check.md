# Health Check API

## Overview

The Health Check API endpoint provides a way to verify the system status and operational health of Nexus AI.

## Endpoint

**GET** `/api/health`

## Response

The endpoint returns a JSON response with the following structure:

```json
{
  "status": "ok",
  "message": "Yes, I am here! System is operational.",
  "timestamp": "2024-02-11T21:00:00.000Z",
  "service": "Nexus AI",
  "version": "1.0.0",
  "database": {
    "connected": true,
    "message": "Database connection successful"
  }
}
```

### Response Fields

- **status**: System status (`ok`, `degraded`, or `error`)
- **message**: Human-readable status message
- **timestamp**: ISO 8601 timestamp of the health check
- **service**: Service name (Nexus AI)
- **version**: Service version
- **database**: Database connectivity status
  - **connected**: Boolean indicating database connectivity
  - **message**: Success message when connected
  - **error**: Error message when not connected

### Status Codes

- **200**: System is healthy
- **503**: System is degraded or experiencing errors
- **405**: Method not allowed (only GET requests are supported)

## Status Page

A user-friendly status page is available at:

**URL**: `/status`

This page provides a visual representation of the system status and allows users to:
- View current system status
- Check database connectivity
- Refresh status with a button click
- See the last update timestamp

## Example Usage

### cURL

```bash
curl https://your-domain.com/api/health
```

### JavaScript

```javascript
fetch('/api/health')
  .then(response => response.json())
  .then(data => {
    console.log('System status:', data.status);
    console.log('Database connected:', data.database.connected);
  });
```

## Use Cases

1. **Monitoring**: Integrate with monitoring tools to track system health
2. **Load Balancer Health Checks**: Use as a health check endpoint for load balancers
3. **User Status Check**: Allow users to verify system availability
4. **Debugging**: Quick way to verify basic system functionality
