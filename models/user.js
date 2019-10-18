const {Schema, model} = require('mongoose')

const userSchema = new Schema({ //! записываем необходимые поля
    email: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
              count: {
                type: Number,
                required: true,
                default: 1
              },
              courseId: {
                type: Schema.Types.ObjectId, // забираем из модуля Schema (element ID) 
                ref: 'Course',
                required: true,
              }
            }
        ]
    }

})

module.exports = model('user', userSchema)