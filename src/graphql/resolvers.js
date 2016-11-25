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

const lambdaResolver = (lambdaName, getEvent) =>
    (args) => invokeLambda(lambdaName, getEvent(args))
                .then((data) => JSON.parse(data.Payload));

const countBy = lambdaResolver(process.env.COUNT_LAMBDA, (args) => ({ selector: args.selector }));
const list = lambdaResolver(process.env.LIST_LAMBDA, (args) => ({ state: args.state }));

module.exports = {
    countBy,
    list,
};
