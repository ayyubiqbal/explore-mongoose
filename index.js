const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: [10, 'maximum 10 chars'],
        minLength: [3, 'maximum 3 chars'],
    },
    lastName: {
        type: String,
        required: true,
        maxLength: [10, 'maximum 10 chars'],
        minLength: [3, 'maximum 3 chars'],
    },
    email: {
        type: String,
        required: true,
        maxLength: [10, 'maximum 10 chars'],
        minLength: [3, 'maximum 3 chars'],
        validate: {
            validator(v) {
                return v.endWith('.com')
            },
            message: 'invalid email format'
        }
    },
    age: Number,
    bio: String,
    single: Boolean,
});

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect('mongodb://localhost:27017/explore-mongoose', { serverSelectionTimeoutMS: 1000 })
    .then(async () => {
        console.log('DB is connected');
        const person = new Person({
            firstName: 'Ayyub',
            lastName: 'Iqbal',
            email: 'abuayubiqbal@gmail.com'
        });
        await person.save();
        console.log(person);
        // const people = await Person.find({ single: true });
        // console.log(people);
    })
    .catch(e => {
        console.log(e);
    })
    .finally(() => {
        mongoose.connection.close();
    })