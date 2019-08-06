const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const hookUserDates = require('../../src/hooks/hook-user-dates');

describe('\'hook-user-dates\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: hookUserDates()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
