const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    price: {type: Number, min:[1, 'Wrong price'], max:[10000, 'Wrong price']},
    discountPercentage: {type: Number, min:[0, 'Wrong percentage'], max:[100, 'Wrong percentage']},
    rating: {type: Number, min:[0, 'Wrong rating'], max:[5, 'Wrong rating'], default: 0},
    stock: {type: Number, min:[0, 'Wrong stock'], default: 0},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String, required: true},
    images: {type: [String], required: true},
    colors: {type: [Schema.Types.Mixed]},
    sizes: {type: [Schema.Types.Mixed]},
    highlights: {type: [String]},
    discountedPrice: {type: Number},
    deleted: {type: Boolean, default: false},
}, {timestamps: true});

const virtualid = productSchema.virtual('id');
virtualid.get(function(){
    return this._id;
})
// const virtualDiscountPrice = productSchema.virtual('discountedPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id
    }
})

exports.Product = mongoose.model('Product', productSchema);