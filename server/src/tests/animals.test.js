import { getAnimals } from '../components/animals/controllers/animals.controllers';
import router from '../components/animals/routes/animals.routes';
import request from 'supertest';

describe('POST /animal', () => {
  test('should return an array of animals', async () => {
    const body = {
      page: 0,
      rowsPerPage: 0,
    };
    const response = await request(router)
      .get('/animal?sortBY=id_senasa:asc')
      .send(body);
    console.log(response);
  });
});
