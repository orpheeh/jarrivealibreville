const CotationRepository = require('../repository/CotationRepository');

/**
 * 
 * @param {CotationRepository} cotationRepository 
 */
module.exports = async (cotation, cotationRepository) =>{
  const c = await cotationRepository.createCotation(cotation);
  return c;
}