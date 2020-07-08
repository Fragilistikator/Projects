//jshint esversion:6

//uses mongoose
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");

//fruits
const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    rating: 10,
    review: "Peaches are yummy!"
});

//fruit.save();

/*const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit"
});

fruit.save();*/


//people
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
    name: "Mango",
    rating: 6,
    review: "Decent fruit"
});

mango.save();

/*const person = new Person ({
    name: "Amy",
    age: 12,
    favoriteFruit: pineapple
});*/

//person.save();

Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err){
    if (err){
        console.log(err);
    }
    else {
        console.log("Successfully updated document");
    }
});

/*Person.deleteMany({name: "John"}, function(err){
    if (err){
        console.log(err);
    }
    else {
        console.log("Successfully deleted many items");
    }
});*/



/*Fruit.insertMany([kiwi, orange, banana], function(err){
    if (err){
        console.log(err);
    }
    else {
        console.log("Successfully saved all the fruits to fruitsDB");
    }
})*/

Fruit.find(function(err, fruits){
    if (err){
        console.log(err);
    }
    else {
        //console.log(fruits);
        mongoose.connection.close();

        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }
});

/*Fruit.updateOne({_id: "5ecd4363860aec0a88e18057"}, {name: "Peach"}, function(err){
    if (err){
        console.log(err);
    }
    else {
        console.log("Successfully updated the document");
    }
})*/

/*Fruit.deleteOne({name: "Peach"}, function(err){
    if (err){
        console.log(err);
    }
    else {
        console.log("Successfully deleted item");
    }
});*/




//uses native driver
/*const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'fruitsDB';

// Use connect method to connect to the server
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    //insertDocuments(db, function(){
    findDocuments(db, function(){
        client.close();
    });
    //});
});

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
        collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great fruit"
        }, 
        {
            name: "Orange",
            score: 6,
            review: "Kinda sour"
        }, 
        {
            name: "Banana",
            score: 9,
            review: "Great stuff!"
        }
        ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits)
        callback(fruits);
    });
}*/