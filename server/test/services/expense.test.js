const assert = require('assert');
const app = require('../../src/app');

describe('\'expense\' service', () => {
  it('registered the service', () => {
    const service = app.service('expense');

    assert.ok(service, 'Registered the service');
  });
});
