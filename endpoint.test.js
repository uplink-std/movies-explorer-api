const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

describe('Эндпоинты возвращает 404 на запрос к несущствующим ресурсам', () => {
  it('Возвращает ошибку и 404-й ответ по запросу к "/"', () => request.get('/').then((response) => {
    expect(response.status).toBe(404);
  }));
});
