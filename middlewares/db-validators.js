const { User } = require('../models');

const userByEmailExists = async( email = "" ) => {
    const user = await User.findOne({ email });

    if( !user ) {
        throw new Error( 'User by email does not exist' );
    }
}



module.exports = {
    userByEmailExists
}