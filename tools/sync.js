import Sequelize from 'sequelize';
import { databaseUrl } from '../src/config';
import Rainbow from '../src/data/models/Rainbow';

const sequelize = new Sequelize(databaseUrl, {
  define: {
    freezeTableName: true,
  },
});

async function sync() {
  await Rainbow.sync({force: true});
  await Rainbow.count().then(function(c) {
    console.log("There are " + c + " rainbows!")
  });
}

export default sync;
