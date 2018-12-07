const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();


module.exports = (event, context, callback) => {

    const res = {
        statusCode: 400,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({message: 'General Server Error'})
    };

    console.log(`Recieved Event: ${JSON.stringify(event, null, 2)}`);

    const params = {
        TableName: `spotx-hack-tasks-${process.env.STAGE}`
    };

    console.log("Scanning Movies table.");

    dynamo.scan(params, (err, data) => {
        if(err) callback(null, res);

        res.statusCode = 200;
        res.body = JSON.stringify(data);
        callback(null, res);
    });
                    
}