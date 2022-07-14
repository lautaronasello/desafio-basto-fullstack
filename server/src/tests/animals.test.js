import request from 'supertest';
import app from '../app';
import { getAnimalById } from '../components/animals/controllers/animals.controllers';
import router from '../components/animals/routes/animals.routes';
import jest from 'jest';
import { connectDB } from '../database';
import mongoose from 'mongoose';

describe('the routes from the api', () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });

  //getAnimals
  test('responds to POST /animal ', async () => {
    try {
      await connectDB();
      const res = await request(app)
        .post('/animal')
        .query({ sortBy: 'id_senasa:asc' })
        .send({
          page: 0,
          rowsPerPage: 20,
        });
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.page).toEqual(1);
      expect(res.body.rowsPerPage).toEqual(20);
      expect(res.body.rows.length <= 20).toEqual(true);
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  //getAnimalSearch
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

  //createAnimal
  test('responds fail to post /animal/create ', async () => {
    try {
      await connectDB();
      const res = await request(app).post('/animal/create').send({
        id_senasa: '111111111111113311111',
        type: 'Toro',
        weight: 200,
        name: 'nombre1',
        device: 'COLLAR',
        device_number: 'c1111113',
      });
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(res.statusCode).toBe(500);
      expect(res.body.message).toEqual(
        'Animal validation failed: id_senasa: La cantidad exacta de caracteres debe ser 16 (dieciséis)'
      );
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  //deleteAnimal
  test('responds fail to DELETE /animal/:id ', async () => {
    try {
      await connectDB();
      const res = await request(app).delete('/animal/62c').send();
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        'Cast to ObjectId failed for value "62c" (type string) at path "_id" for model "Animal"'
      );
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  //editAnimals
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

  //getAnimalById
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
});
