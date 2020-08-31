const CotationRepository = require('../repository/CotationRepository');

/**
 * 
 * @param {CotationRepository} cotationRepository 
 */
module.exports = async (cotationRepository) =>{
    const cotations = await cotationRepository.findAllCotation();
    return cotations;
}