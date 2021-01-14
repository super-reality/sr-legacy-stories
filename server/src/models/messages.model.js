module.exports = function (app) {
    const modelName = 'messages';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema({
        text: {
            type: String,
            allowNull: false
        },
        user: {
            username: {
                type: String,

            },
            avatar: {
                type: String,

            },
            _id: {
                type: String,
            }
        },
        userId: {
            type: String
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }

    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);

};
