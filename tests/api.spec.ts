import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('should make successful API request', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
    
    const json = await response.json();
    expect(json).toHaveProperty('userId');
    expect(json).toHaveProperty('title');
    expect(json).toHaveProperty('body');
  });

  test('should handle POST request', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Test Post',
        body: 'This is a test post',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201);

    const json = await response.json();
    expect(json.title).toBe('Test Post');
  });
});
