import request from 'supertest';
import app from './server.js'; // Import the configured app

describe('Tasks API', () => {
    
    test('GET /api/tasks -- should return all tasks', async () => {
        const response = await request(app).get('/api/tasks');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0); // Assuming initial data exists
    });

    test('POST /api/tasks -- should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ text: 'Test a new task' });

        expect(response.statusCode).toBe(201);
        expect(response.body.text).toBe('Test a new task');
        expect(response.body.completed).toBe(false);
    });

    test('POST /api/tasks -- should fail with empty text', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ text: '' });
            
        expect(response.statusCode).toBe(400);
    });
});