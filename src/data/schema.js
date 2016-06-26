import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import content from './queries/content';
import news from './queries/news';
import week from './queries/week';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      content,
      news,
      week,
    },
  }),
});

export default schema;
