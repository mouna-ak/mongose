// Import required modules
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env


// Connect to MongoDB using Mongoose
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err);
    });


// Create a Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  favoriteFoods: [{ type: String }]
});

// Create a Person Model
const Person = mongoose.model('Person', personSchema);

// Create a new person document and save it to the database
const person = new Person({
  name: 'John',
  age: 25,
  favoriteFoods: ['pizza', 'burger', 'sushi']
});

person.save()
  .then(data => {
    console.log('Person saved:', data);
  })
  .catch(err => {
    console.error(err);
  });

// Create many people using Model.create()
const arrayOfPeople = [
  { name: 'Alice', age: 30, favoriteFoods: ['sushi', 'ramen'] },
  { name: 'Bob', age: 35, favoriteFoods: ['burger', 'fries'] },
  { name: 'Charlie', age: 40, favoriteFoods: ['pizza', 'pasta'] }
];

Person.create(arrayOfPeople)
  .then(data => {
    console.log('People created:', data);
  })
  .catch(err => {
    console.error(err);
  });

// Use Model.find() to search for people by name
Person.find({ name: 'John' })
  .then(data => {
    console.log('People found by name:', data);
  })
  .catch(err => {
    console.error(err);
  });

// Use Model.findOne() to search for a person by favorite food
const food = 'burger';
Person.findOne({ favoriteFoods: food })
  .then(data => {
    console.log(`Person found by favorite food "${food}":`, data);
  })
  .catch(err => {
    console.error(err);
  });

// Use Model.findById() to search for a person by _id
const personId = '6436af498dcda3c126fa9a4f'; // Replace with valid _id
Person.findById(personId)
  .then(data => {
    console.log(`Person found by _id "${personId}":`, data);
  })
  .catch(err => {
    console.error(err);
  });

// Perform classic updates by finding a person by _id, adding "hamburger" to their favoriteFoods, and saving the updated person
Person.findByIdAndUpdate(personId, { $push: { favoriteFoods: 'hamburger' } }, { new: true })
  .then(data => {
    console.log('Person updated:', data);
  })
  .catch(err => {
    console.error(err);
  });

// Perform new updates on a document using Model.findOneAndUpdate()
const personName = 'Alice';
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
  .then(data => {
    console.log(`Person "${personName}" updated:`, data);
  })
  .catch(err => {
    console.error(err);
  });

// Delete one person by _id using Model.findByIdAndRemove()
Person.findByIdAndRemove(personId)
  .then(data => {
    console.log(`Person "${personId}" removed:`, data);
  })
  .catch(err => {
    console.error(err);
  });

// Delete all people with name "Mary" using Model.deleteMany()
const name = 'Mary';
Person.deleteMany({ name: name })
  .then(data => {
    console.log(`People with name "Mary" deleted:`, data);
  })
  .catch(err => {
    console.error(err);
  });



// Find people who like burritos, sort by name, limit to 2 documents, and hide age field
const findPeopleWhoLikeBurritos = async () => {
  try {
    const data = await Person.find({ favoriteFoods: 'burrito' })
      .sort({ name: 1 })
      .limit(2)
      .select('-age')
      .exec();
    console.log('People who like burritos:', data);
  } catch (err) {
    console.error(err);
  }
};

findPeopleWhoLikeBurritos();


