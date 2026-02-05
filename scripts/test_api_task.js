import fetch from 'node-fetch';

async function test() {
  const res = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: '00000000-0000-0000-0000-000000000000',
      employee_id: 'alex',
      title: 'Test task from script',
      description: 'This is a test task',
      priority: 'low',
      run_mode: 'auto'
    }),
  });

  const json = await res.json();
  console.log('Status:', res.status);
  console.log('Body:', json);
}

test().catch(console.error);
