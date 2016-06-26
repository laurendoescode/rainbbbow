import sequelize from '../sequelize';
import Rainbow from './Rainbow';

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { Rainbow };
