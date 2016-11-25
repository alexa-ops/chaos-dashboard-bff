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

    type Tag {
        Key: String
        Value: String
    }
    type InstanceState {
        Code: Int!
        Name: String!
    }

    type Instance {
        InstanceId: String!
        ImageId: String!
        State: InstanceState!
        Tags: [Tag!]
    }

    enum CountSelector {
        az
        name
        size
        state
    }

    type Query {
        countBy(selector: CountSelector): Count!
        list(state: String): [Instance!]
    }
`);
