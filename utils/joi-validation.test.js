const { urlValidator } = require('./joi-validation');

describe('Проверка валидаторов', () => {
  it('Валидация не возвращает ошибоку когда url задан корректно', () => {
    const { error } = urlValidator.required().validate('http://github.com');
    expect(error).toBeUndefined();
  });

  it('Валидация возвращает ошибоку когда url задан с ошибкой', () => {
    const { error } = urlValidator.required().validate('http://123');
    expect(error).toBeDefined();
  });

  it('Валидация возвращает ошибоку когда url задан с неразрешенной схемой', () => {
    const { error } = urlValidator.required().validate('ftp://github.com');
    expect(error).toBeDefined();
  });

  it('Валидация возвращает ошибку когда в url отсутствует схема', () => {
    const { error } = urlValidator.required().validate('github.com');
    expect(error).toBeDefined();
  });
});
