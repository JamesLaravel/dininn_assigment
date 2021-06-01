const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator')
const validate = new Validator();
const db = require('../models')
const users = db.User;

exports.login = async(req, res, next)=> {

    const schema = {
        email: { type: "email"},
        password: {type:"string"}
    }

    const { email, password } = req.body

    const check = validate.compile(schema)

   const result = check({
        email: email,
        password:password
    })

    if(result !== true){
       return res.status(422).json({
           error: result
       })
    }

    try{
       
        const user = await users.findOne({ where: 
            {
                email: email,
                password: password
            }
        })

        if(user == null){
            res.status(400).json({
                status_code: 0,
                message: "Invalid credentials"
            })
        }

        const token = getSignedToken(user);

        res.status(200).json({
            status_code: 1.,
            message: 'user login successfull',
            token: token
        })
    }catch(error) {
        error.status = 400;
        next(error);
    }

}


getSignedToken = user => {

    return jwt.sign({
        user: {
            id: user.id,
            email: user.email,
            amount_gained: user.gained,
            bonus: user.bonus_gained
        }
    }, process.env.JWTSECRET_KEY, {
        expiresIn:process.env.JWT_EXP
    })
}


//claim bonus

