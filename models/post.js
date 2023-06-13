const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      max: 650,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
)


module.exports = postSchema




