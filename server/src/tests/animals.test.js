import request from 'supertest';
import app from '../app';
import { getAnimalById } from '../components/animals/controllers/animals.controllers';
import router from '../components/animals/routes/animals.routes';
import jest from 'jest';
import { connectDB } from '../database';
import mongoose from 'mongoose';

describe('has come to return the param id', () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });
  test('responds to /animal:id', async () => {
    try {
      await connectDB();
      const res = await request(app)
        .get('/animal/62cf05f74f09ce9d58ffa2cb')
        .send();
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toEqual('62cf05f74f09ce9d58ffa2cb');
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  test('responds to /animal/search POST', async () => {
    try {
      await connectDB();
      const res = await request(app)
        .get('/animal/62cf05f74f09ce9d58ffa2cb')
        .send({ search: '62cf05f74f09ce9d58ffa2cb' });
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toEqual('62cf05f74f09ce9d58ffa2cb');
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  test('responds fail to PUT /animal/:id ', async () => {
    try {
      await connectDB();
      const res = await request(app).put('/animal/123').send({ weight: 123 });
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        "Cannot read properties of undefined (reading 'length')"
      );
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
