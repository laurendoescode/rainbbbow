import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import week from './queries/week';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      week,
    },
  }),
});

export default schema;
