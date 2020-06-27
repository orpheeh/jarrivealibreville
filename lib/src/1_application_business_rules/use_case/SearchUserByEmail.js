module.exports = async function(email, { userRepository }){
    return await userRepository.findByEmail(email);    
}