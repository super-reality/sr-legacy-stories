const { BadRequest } = require('@feathersjs/errors');
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return async context => {

        const { data, method, result, params } = context;
        data.ownerId = params.user._id
        data.users = [params.user]
        if (data.collectiveName.length < 4) {
            throw new BadRequest('Invalid name', data, { errors: { name: 'Name should be greater than 4 character' } });
        }

        return context;
    };
};
