import request from 'supertest';
import app from '../app';
import { getAnimalById } from '../components/animals/controllers/animals.controllers';
import router from '../components/animals/routes/animals.routes';
import jest from 'jest';
import { connectDB } from '../database';

describe('has come to return the param id', () => {
  test('responds to /animal:id', async () => {
    await connectDB();
    const res = await request(app)
      .get('/animal/62cf05f74f09ce9d58ffa2cb')
      .send();
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toEqual('62cf05f74f09ce9d58ffa2cb');
  });

  test('responds to /animal:id', async () => {
    await connectDB();
    const res = await request(app)
      .get('/animal/62cf05f74f09ce9d58ffa2cb')
      .send();
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toEqual('62cf05f74f09ce9d58ffa2cb');
  });
});
