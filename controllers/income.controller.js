const db = require('../db');

exports.create = async (userId, { payer, amount, zdate}) => {
    const mysqlDate = zdate.toISOString().substring(0, 10);
    const query = `INSERT INTO Income (\
        user_id,\
        paid_by,\
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

exports.report = async (userId) => {
    const queryIncome = `SELECT SUM(amount) as totalIncome FROM income WHERE user_id = ${userId}`;
    const incomeResult = await db.query(queryIncome);
    const totalIncome = incomeResult[0].totalIncome || 0;

    const queryMaiser = `SELECT SUM(amount) as totalMaiser FROM maiser WHERE user_id = ${userId}`;
    const maiserResult = await db.query(queryMaiser);
    const totalMaiser = maiserResult[0].totalMaiser || 0;

    let concludinMessage;
    // if user gave more maiser than s/he owes
    if ((totalIncome * 0.1) < totalMaiser) {
        const gaveMore = totalMaiser - (totalIncome * 0.1);
        concludinMessage = `You gave $${gaveMore} Maiser in advance.`;
    } else if ((totalIncome * 0.1) > totalMaiser) { // if user gave less maiser than s/he owes
        const stillOwe = (totalIncome * 0.1) - totalMaiser;
    	concludingMessage = `You still owe $${stillOwe} to Maiser.`;
    } else { // user gave just enough
        concludingMessage = `You are up to date with all your Maiser payments.`;
    }
    return {
        totalIncome,
        totalMaiser,
        concludingMessage
    }
}