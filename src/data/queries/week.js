import { GraphQLList as List } from 'graphql';
import { resolver } from 'graphql-sequelize';
import RainbowType from '../types/RainbowType';
import Rainbow from '../models/Rainbow';

const week = {
  type: new List(RainbowType),
  resolve: resolver(Rainbow)
};

export default week;
