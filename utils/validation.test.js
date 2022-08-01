const {
  joiUrlValidator, joiEmailValidator, mongoEmailValidator, mongoUrlValidator,
} = require('./validation');

const validUrls = [
  'http://github.com',
  'http://github.com?asdasd',
  'http://github.com#port',
  'http://github.com:123',
  'https://github.com:123',
  '/uploads/stones_in_exile_b2f1b8f4b7.jpeg',
  'https://www.youtube.com/watch?v=D5fBhbEJxEU',
  '/uploads/thumbnail_all_tommoros_parties_33a125248d.jpeg',
  'https://www.youtube.com/watch?v=dgSyC6me-jQ,',
];

const invalidUrls = [
  'http://123',
  'ftp://github.com',
  'asdasdasd',
  '',
];

const validEmails = [
  'aleksandr@test.ru',
  'aleksandr@test1.ru',
  'a@b.ru',
];

const invalidEmails = [
  'aleksandr-test.ru',
  '...aleksandr@test1.ru',
  'aasb.ru',
  '',
];

expect.extend({
  toBeUndefinedWithMessage(received, message) {
    return {
      pass: received === undefined,
      message: () => message,
    };
  },
  toBeDefinedWithMessage(received, message) {
    return {
      pass: received !== undefined,
      message: () => message,
    };
  },
  toBeTruthyWithMessage(received, message) {
    return {
      pass: !!received,
      message: () => message,
    };
  },
  toBeFalsyWithMessage(received, message) {
    return {
      pass: !received,
      message: () => message,
    };
  },
  toBeWithMessage(received, expected, message) {
    return {
      pass: received === expected,
      message: () => message,
    };
  },
});

describe('Проверка валидаторов URL', () => {
  it('Валидация не возвращает ошибоку когда url задан корректно', () => {
    validUrls.forEach((url) => {
      const { error, value } = joiUrlValidator.required().validate(url);
      expect(error).toBeUndefinedWithMessage(`url: ${url}`);
      expect(value).toBeWithMessage(url, `url: ${url}`);
    });
  });

  it('Валидация возвращает ошибоку когда url задан не корректно', () => {
    invalidUrls.forEach((url) => {
      const { error, value } = joiUrlValidator.required().validate(url);
      expect(error).toBeDefinedWithMessage(`url: ${url}`);
      expect(value).toBeWithMessage(url, `url: ${url}`);
    });
  });

  it('Валидация mongo не возвращает ошибоку когда url задан корректно', () => {
    validUrls.forEach((url) => {
      const isValid = mongoUrlValidator.validator(url);
      expect(isValid).toBeTruthyWithMessage(`url: ${url}`);
    });
  });

  it('Валидация mongo возвращает ошибоку когда url задан не корректно', () => {
    invalidUrls.forEach((url) => {
      const isValid = mongoUrlValidator.validator(url);
      expect(isValid).toBeFalsyWithMessage(`url: ${url}`);
    });
  });
});

describe('Проверка валидаторов Email', () => {
  it('Валидация не возвращает ошибоку когда email задан корректно', () => {
    validEmails.forEach((email) => {
      const { error, value } = joiEmailValidator.required().validate(email);
      expect(error).toBeUndefinedWithMessage(`email: ${email}`);
      expect(value).toBeWithMessage(email, `email: ${email}`);
    });
  });

  it('Валидация возвращает ошибоку когда email задан некорректно', () => {
    invalidEmails.forEach((email) => {
      const { error, value } = joiEmailValidator.required().validate(email);
      expect(error).toBeDefinedWithMessage(`email: ${email}`);
      expect(value).toBeWithMessage(email, `email: ${email}`);
    });
  });

  it('Валидация mongo не возвращает ошибоку когда email задан корректно', () => {
    validEmails.forEach((email) => {
      const isValid = mongoEmailValidator.validator(email);
      expect(isValid).toBeTruthyWithMessage(`email: ${email}`);
    });
  });

  it('Валидация mongo возвращает ошибоку когда email задан некорректно', () => {
    invalidEmails.forEach((email) => {
      const isValid = mongoEmailValidator.validator(email);
      expect(isValid).toBeFalsyWithMessage(`email: ${email}`);
    });
  });
});
