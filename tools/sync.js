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
  const red = Math.random();
  const orange = Math.random();
  const yellow = Math.random();
  const green = Math.random();
  const cyan = Math.random();
  const blue = Math.random();
  const pink = Math.random();
  const purple = Math.random();
  const total = red+orange+yellow+green+cyan+blue+pink+purple;
  var rainbow = Rainbow.build({
    date: new Date,
    red: (red/total) * 100,
    orange: (orange/total) * 100,
    yellow: (yellow/total) * 100,
    green: (green/total) * 100,
    cyan: (cyan/total) * 100,
    blue: (blue/total) * 100,
    pink: (pink/total) * 100,
    purple: (purple/total) * 100
  });
  await rainbow.save().then(function() {
    Rainbow.count().then(function(c) {
    	console.log("There are " + c + " rainbows!")
      });
  });
}

export default sync;
