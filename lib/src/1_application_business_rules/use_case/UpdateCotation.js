const CotationRepository = require('../repository/CotationRepository');

/**
 * 
 * @param {*} update 
 * @param {CotationRepository} cotationRepository 
 */
module.exports = async (id, update, cotationRepository) =>{
  const cotation = await cotationRepository.updateCotation(id, update);
  return cotation;
}