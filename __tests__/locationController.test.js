const request = require('supertest');
const app = require('../app');
const db = require('../models').sequelize;

beforeAll(async () => {
  await db.sync({ force: true });
});

describe('Location API', () => {
  it('should create a new location', async () => {
    const res = await request(app)
      .post('/api/locations')
      .send({ name: 'Test Location', address: 'Test Address', lat: 0, lng: 0, color: '#FF0000' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Test Location');
  });

  it('should retrieve all locations', async () => {
    const res = await request(app).get('/api/locations');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

afterAll(async () => {
  await db.close();
});