module.exports = function (app) {
  const modelName = 'groups';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({

    collectiveName: {
      type: String,
      required: true,
      index: true
    },
    collectivePhoto: {
      type: String
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      index: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    },
    updatedAt: {
      type: Date
    },
    users: {
      type: Array, default: []
    },
    channels: {
      type: Array,
      default: []
   }
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName)
  }
  return mongooseClient.model(modelName, schema)

};
