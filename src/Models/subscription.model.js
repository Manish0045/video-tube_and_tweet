const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,//User who is subscribed
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId,//User whom subscribed
        ref: "User"
    }
}, {
    timestamps: true
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;