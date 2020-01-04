const db = require('../db');

exports.registerUser = async ({
    firstName,
    lastName,
    password,
    email,
    securityQ,
    securityA,
    maiserLevel
}) => {
    const regularUser = 2;
    const query = `INSERT INTO Users (\
        first_name,\
        last_name,\
        email,\
        user_password,\
        user_type_id,\
        security_question_id,\
        security_answer,\
        maiser_level_id)\
        VALUES (\
        "${firstName}",\
        "${lastName}",\
        "${email}",\
        "${password}",\
        ${regularUser},\
        ${securityQ},\
        "${securityA}",\
        ${maiserLevel}\
        );`
    try {
        const result = await db.query(query);
        return {
            result: 'sucess',
            message: 'User registered successfully',
            user: {
                firstName,
                lastName,
                userId: result
            }
        }
    } catch (error) {
        return {
            result: 'failure',
            error
        }
    }
    
}

exports.login = async ({email, password}) => {
    const query = `SELECT * FROM Users WHERE email = '${email}' and user_password = '${password}'`;
    try {
        const userResult = await db.query(query);
        if (userResult && userResult[0]) {
            return {
                result: 'success',
                message: 'Login success',
                user: {
                    firstName: userResult[0].first_name,
                    lastName: userResult[0].last_name,
                    userId: userResult[0].user_id
                }
            };
        } else {
            return {
                result: 'failure',
                error: 'Invalid username or password'
            }
        } 
    } catch (error) {
        return {
            result: 'failure',
            error
        }
    }
    
}