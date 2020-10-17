module.exports = async (vkRepo) => {
       try {
           return await vkRepo.getAll();
       } catch(err){
           console.log(err);
           return null;
       }
}