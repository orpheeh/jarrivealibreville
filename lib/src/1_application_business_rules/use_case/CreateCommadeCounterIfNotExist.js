const CounterRepository = require('../repository/CounterRepository');

/**
 * 
 * @param {CounterRepository} counterRepository 
 */
module.exports = async ( type, counterRepository ) => {
    const year = new Date().getFullYear();
    return counterRepository.createIfNotExist(type, year);
}