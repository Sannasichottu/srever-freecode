// Mongodb & mongoose start


require('dotenv').config();


let mongoose = require('mongoose');


mongoose.connect( "mongodb+srv://dhojay:dhojay@cluster0.ebuwxab.mongodb.net/taskCrud?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;


var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model('Person', personSchema);


var createAndSavePerson = function(done) {
  var chottu = new Person({name: "Sannasi Chottu", age: 24, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  chottu.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let arrayOfPeople = [
  {
    name: "Garry",
    age: 35,
    favoriteFoods: ["fried chicken", "chicken wings", "chicken nuggets"]
  },
  { name: "Hannah", age: 24, favoriteFoods: ["watermelon", "mango"] },
  { name: "Igor", age: 52, favoriteFoods: ["vegetable soup"] }
];

var createManyPeople = function(arrayOfPeople, done) {

  Person.create(arrayOfPeople, (error, createdPeople) => {
    if(error){
      console.log(error)
    }else{
      done(null, createdPeople)
    }
  });
};



const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, (error, arrayOfResults) => {
    if(error){
      console.log(error)
    }else{
      done(null, arrayOfResults)
    }
  })
};

const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods : {$all : [food]}}, (error, result) => {
    if(error){
      console.log(error)
    }else{
      done(null, result)
    }
  })
}

const findPersonById = function(personId, done) {
  Person.findById(personId, (error, result) => {
    if(error){
      console.log(error)
    }else{
      done(null, result)
    }
  })
}

const findEditThenSave = function(personId, done) {
  var foodToAdd = "hamburger";

  Person.findById(personId, (error, result) => {
    if(error){
      console.log(error)
    }else{
      result.favoriteFoods.push(foodToAdd)
      result.save((error, updatedResult) => {
        if(error){
          console.log(error)
        }else{
          done(null, updatedResult)
        }
      })
    }
  })
};

const findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, updatedRecord) => {
    if(error){
      console.log(error)
    }else{
      done(null, updatedRecord)
    }
  })
};

const removeById = function(personId, done) {
    Person.findByIdAndRemove(personId, (error, deletedRecord) => {
    if(error){
      console.log(error)
    }else{
      done(null, deletedRecord)
    }
  })
};

const removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (error, JSONStatus)=> {
    if(error){
      console.log(error)
    }else{
      done(null, JSONStatus)
    }
  })
};

const queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods : {$all: [foodToSearch]}})
    .sort({name: 'asc'})
    .limit(2)
    .select('-age')
    .exec((error, filteredResults) => {
    if(error){
      console.log(error)
    }else{
      done(null, filteredResults)
    }
  })

};

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;



// mongodb & mongoose end