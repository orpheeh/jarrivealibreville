module.exports = async (vk, vkRepository) => {

    try {
        return await vkRepository.create(vk);
    } catch(err){
        console.log(err);
        return null;
    }
}