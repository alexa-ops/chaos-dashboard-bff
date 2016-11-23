'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');

const AWS = require('aws-sdk');

const lambda = new AWS.Lambda();

const invokeLambda = (lambdaName, event) => {
    const params = {
        FunctionName: lambdaName,
        // InvocationType: 'Event', // run async
        Payload: JSON.stringify(event),
    };

    return new BbPromise((resolve, reject) => {
        lambda.invoke(params, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('Received result: ', data);
            resolve(data);
        });
    });
}

const countBy = (args) => {
    const lambdaName = process.env.COUNT_LAMBDA;

    return invokeLambda(lambdaName, { selector: args.selector })
            .then((data) => JSON.parse(data.Payload));
}

module.exports = {
    countBy,
};
