import Ajv from 'https://esm.sh/ajv@8.12.0';
import addFormats from 'https://esm.sh/ajv-formats@2.1.1';
import { serve } from 'https://deno.land/std/http/server.ts';

// Import the manifest schema
import manifestSchema from './agent_manifest.schema.json' assert { type: 'json' };

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(manifestSchema);

serve(async (req: Request) => {
  try {
    const manifest = await req.json();
    const valid = validate(manifest);
    if (!valid) {
      return new Response(JSON.stringify({
        valid: false,
        errors: validate.errors
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    // Optionally: Add permission/rate limit checks here
    return new Response(JSON.stringify({ valid: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    let errorMessage = 'Invalid request';
    if (e instanceof Error) {
      errorMessage = e.message || errorMessage;
    } else if (typeof e === 'string') {
      errorMessage = e || errorMessage;
    } else {
      try {
        errorMessage = JSON.stringify(e) || errorMessage;
      } catch {
        // keep default errorMessage
      }
    }

    return new Response(JSON.stringify({
      valid: false,
      error: errorMessage
    }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
});
