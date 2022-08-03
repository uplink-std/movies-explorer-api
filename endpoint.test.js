const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

describe('Эндпоинты возвращает 401 на запросы к защищенным ресурсам без аутентификации', () => {
  it('Возвращает ошибку и 401-й ответ по запросу get "/movies"', () => request.get('/movies').then((response) => {
    expect(response.status).toBe(401);
  }));

  it('Возвращает ошибку и 401-й ответ по запросу post "/movies"', () => request.post('/movies').then((response) => {
    expect(response.status).toBe(401);
  }));

  it(
    'Возвращает ошибку и 401-й ответ по запросу delete "/movies/:movieId"',
    () => request.delete('/movies/00112233445566778899aabb').then((response) => {
      expect(response.status).toBe(401);
    }),
  );

  it('Возвращает ошибку и 401-й ответ по запросу get "/users/me"', () => request.get('/users/me').then((response) => {
    expect(response.status).toBe(401);
  }));

  it('Возвращает ошибку и 401-й ответ по запросу patch "/users/me"', () => request.patch('/users/me').then((response) => {
    expect(response.status).toBe(401);
  }));
});
