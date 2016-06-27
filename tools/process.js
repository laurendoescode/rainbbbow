import getPixels from 'get-pixels';
import quantize from 'quantize';
import fetch from 'node-fetch';
import Sequelize from 'sequelize';
import { databaseUrl, auth } from '../src/config';
import Rainbow from '../src/data/models/Rainbow';
import moment from 'moment';

const sequelize = new Sequelize(databaseUrl, {
  define: {
    freezeTableName: true,
  },
});

let primaryHueVotes = {
  red: 0,
  orange: 0,
  yellow: 0,
  green: 0,
  cyan: 0,
  blue: 0,
  purple: 0,
  pink: 0
};

async function process() {
  const host = 'api.dribbble.com/v1/shots';
  const formattedDate = format(moment().subtract('days', 1));
  const token = auth.dribbble.access_token;
  const url = `https://${host}?date=${formattedDate}&access_token=${token}`;
  await Rainbow.sync();
  const res = await fetch(url).then((res) => {
      return res.json();
  }).then(function(json) {
      return json;
  });
  const imageList = res.map((elem) => {
  	return elem.images.normal;
  });
  let newList = [];
  const processImage = (err, pixels) => {
    const hueList = findImagePrimaryHues(pixels);
    hueList.forEach((hue) => {
      primaryHueVotes[hue] += 1;
    });
    newList.push(percentageRainbow(primaryHueVotes));
    if (newList.length == imageList.length) {
    	saveRainbow(formattedDate, newList[newList.length - 1]);
    }
  };
  for (let img of imageList) {
    getPixels(img, processImage);
  }
}

export default process;

function findImagePrimaryHues(pixels) {
  const arrayOfPixels = pixels.data;
  const channelCount = pixels.shape.slice()[pixels.shape.slice().length - 1];
  const pixelCount = arrayOfPixels.length / channelCount;
  const colorCount = 3;
  const quality = 10;
  const pixelArray = [];
  for (let i = 0; i < pixelCount; i = i + quality) {
      const offset = i * 4;
      const r = arrayOfPixels[offset + 0];
      const g = arrayOfPixels[offset + 1];
      const b = arrayOfPixels[offset + 2];
      const a = arrayOfPixels[offset + 3];
      // If pixel is mostly opaque and not white
      if (a >= 125) {
          if (!(r > 250 && g > 250 && b > 250)) {
              pixelArray.push([r, g, b]);
          }
      }
  }
  const colorMap = quantize(pixelArray, colorCount);
  const dominantPrimaryHues = colorMap.palette().map((elem, idx) => {
    return getClosestPrimary(rgbToHue(elem));
  });
  return dominantPrimaryHues;
}

// Math

function getClosestPrimary(hue) {
  hue = hue % 1;
  const primaryHues = [
    {name: 'red', value: 0},
    {name: 'orange', value: 30/360},
    {name: 'yellow', value: 60/360},
    {name: 'green', value: 120/360},
    {name: 'cyan', value: 180/360},
    {name: 'blue', value: 240/360},
    {name: 'purple', value: 285/360},
    {name: 'pink', value: 330/360}
  ];
  const closestPrimary = primaryHues.reduce((curr, last) => {
    return getPrimaryHueDistance(curr, hue) < getPrimaryHueDistance(last, hue) ? curr : last;
  });
  return closestPrimary.name;
}

function rgbToHue(arr) {
    var rr, gg, bb,
      r = arr[0] / 255,
      g = arr[1] / 255,
      b = arr[2] / 255,
      h,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
      diffc = function(c){
          return (v - c) / 6 / diff + 1 / 2;
      };
    if (diff == 0) {
      h = 0;
    } else {
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if (r === v) {
          h = bb - gg;
      }else if (g === v) {
          h = (1 / 3) + rr - bb;
      }else if (b === v) {
          h = (2 / 3) + gg - rr;
      }
      if (h < 0) {
          h += 1;
      }else if (h > 1) {
          h -= 1;
      }
    }
    return h;
}

function getPrimaryHueDistance(primaryHue, hue) {
  return Math.min(Math.abs(primaryHue.value - hue), Math.abs(1 + primaryHue.value - hue));
}

function percentageRainbow(hueVotes) {
  let total = 0;
  for (let key in hueVotes) {
      total += hueVotes[key];
  }
  for (let key in hueVotes) {
      hueVotes[key] = hueVotes[key] / total * 100;
  }
  return hueVotes;
}

function format(time) {
  return time.toISOString().split('T')[0];
}

async function saveRainbow(formattedDate, rainbow) {
	const rainbbbow = Rainbow.build({
	  date: new Date(formattedDate),
	  red: rainbow.red,
	  orange: rainbow.orange,
	  yellow: rainbow.yellow,
	  green: rainbow.green,
	  cyan: rainbow.cyan,
	  blue: rainbow.blue,
	  pink: rainbow.pink,
	  purple: rainbow.purple
	});
	await rainbbbow.save().then(() => {
	  Rainbow.count().then((c) => {
  		console.log("There are " + c + " rainbows!")
  	  });
	});
}