module.exports = function (app) {
    const modelName = 'steps';
    const mongooseClient = app.get('mongooseClient');
    const {Schema} = mongooseClient;
    const schema = new Schema({


        name: {
            type: String,
            required: true,
            index: true
        },
        items: {
            type: Array
        },
        anchor: {
            type: String,
            default: null
        },
        recordingId: {
            type: String,
            default: ''
        },
        snapShot: {
            type: String,
        },
        recordingTimestamp: {
            type: String,
            default: ''
        },
        createdBy: {
            type: Schema.Types.ObjectId
        },
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date},

    });

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);

};
