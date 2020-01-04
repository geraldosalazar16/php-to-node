const db = require('../db');

exports.create = async (userId, { payer, amount, zdate}) => {
    const mysqlDate = zdate.toISOString().substring(0, 10);
    const query = `INSERT INTO Maiser (\
        user_id,\
        paid_to,\
        amount,\
        income_date)\
        VALUES (\
            '${userId}',\
            '${payer}',\
            '${amount}',\
            '${mysqlDate}'\
        )`;
    try {
        const result = await db.query(query);
        return {
            result: 'success'
        }
    } catch (error) {
        return {
            result: 'failure',
            error
        }
    }
}