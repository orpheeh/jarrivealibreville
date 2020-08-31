const CounterRepository = require('../../1_application_business_rules/repository/CounterRepository');
const Counter = require('../../3_frameworks_and_drivers/database/mongoDB/models/CommandeCounter')

module.exports = class extends CounterRepository {

    async createIfNotExist(type, year){
       const c = await Counter.findOne({ type, year });
       if(c == null){
           const newCounter = new Counter({ count: 0, type, year });
           const counter =  await newCounter.save();
           return counter;
       } 
       return c;
    }

    async get(type, year){
       const counter = await Counter.findOne({ type, year });
       return counter;
    }

    async increment(type, year){
        const counter = await Counter.findOne({ type, year });
        counter.count++;
        const res = await counter.save();
        return res;
       
    }
}