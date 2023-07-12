//review/ rating / createdAt / ref to tour / ref to user

const mongoose =  require('mongoose');

const reviewSchema = new mongoose.Schema({
    review:{
        type: String,
        required: [true,"Must have a review"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    Tour:{
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour']
    },
    User: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required: [true, 'Review must belong to a user as well']
    }
},
{
    toJSON: { virtuals: true },     //those properties which are not in the model but calculated must also be in the query
    toObject: { virtuals: true }
});

reviewSchema.pre(/^find/, function(next){
    // this.populate({
    //   path: 'Tour',
    //   select: 'name'
    // })
    this.populate({
        path: 'User',
        select: 'name photo'
    });
    next();
})


const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;


//POST   /tour/2131121312/reviews