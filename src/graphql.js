'use strict';

const graphql = require('graphql');

const rootValue = require('./graphql/resolvers');
const schema = require('./graphql/schema');

// {
//   "body": {
//     "query": "query($selector: CountSelector!) { countBy(selector: $selector) { total, groups { key, value } } }",
//     "variables": {
//       "selector": "az"
//     }
//   }
// }
// {
//     "body": "{ \"query\": \"query($selector: CountSelector!) { countBy(selector: $selector) { total, groups { key, value } } }\", \"variables\": { \"selector\": \"az\" } }"
// }

module.exports.handler = (event, context, cb) => {
  console.log('Received event', event);

  const contextValue = {};
  const body = JSON.parse(event.body);

  return graphql
    .graphql(schema, body.query, rootValue, contextValue, body.variables)
    .then((response) => {
        console.log('Returning result', response);
        cb(null, {
            statusCode: response.errors ? 403 : 200,
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(response)
        });
    })
    .catch((err) => cb(err));
};
