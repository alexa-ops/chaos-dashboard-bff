'use strict';

const graphql = require('graphql');

module.exports = graphql.buildSchema(`
    type Group {
        key: String
        value: String
    }
    type Count {
        total: Int!
        groups: [Group!]
    }

    enum CountSelector {
        az
        name
        state
    }

    type Query {
        countBy(selector: CountSelector!): Count!
    }
`);
