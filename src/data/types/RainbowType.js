import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const RainbowType = new ObjectType({
  name: 'Rainbow',
  fields: {
    id: { type: new NonNull(ID) },
    date: { type: StringType },
    red: { type: FloatType },
    orange: { type: FloatType },
    yellow: { type: FloatType },
    green: { type: FloatType },
    cyan: { type: FloatType },
    blue: { type: FloatType },
    purple: { type: FloatType },
    pink: { type: FloatType },
  },
});

export default RainbowType;
