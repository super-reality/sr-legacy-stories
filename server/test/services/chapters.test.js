const assert = require('assert');
const app = require('../../src/app');

describe('\'chapters\' service', () => {
  it('registered the service', () => {
    const service = app.service('chapters');

    assert.ok(service, 'Registered the service');
  });
});
