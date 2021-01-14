module.exports = function (app) {
    const modelName = 'tags';
    const mongooseClient = app.get('mongooseClient');
    const { Schema } = mongooseClient;
    const schema = new Schema({

        name: {
            type: String,
            required: true,
            index: true
        },
        type: {
            type: String,
            index: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            index: true
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date }
    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);

};
