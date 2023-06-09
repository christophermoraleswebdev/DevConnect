const mongoose = require('mongoose')
const Schema = mongoose.Schema



const postShema = new Schema(
      {
            userId: {
              type: String,
              required: true,
            },
            description: {
              type: String,
              max: 650,
            },
            img: {
              type: String,
            }
          },
          { timestamps: true } 
)


module.exports = postShema



