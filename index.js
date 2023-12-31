const fs = require('fs');
const superagent = require('superagent');

// Using promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file.');
      resolve(data);
    });
  });
};

// Using promisify - writing a file
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write the file');
      resolve('Success');
    });
  });
};

// how to run many promises at the same time
// getting 3 random dog images

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    // create an array that only contains body.message
        const imgs = all.map(el => el.body.message);
    console.log(imgs);

    // used to read the results
    // console.log(res.body.message);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY!';
};

(async () => {
  try {
    console.log('1: will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR');
  }
})();

// Using asnyc/await
/*
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dogg.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY!';
};

(async() => {
    try {
        console.log('1: will get dog pics!');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Done getting dog pics!');
    } catch(err){
        console.log('ERROR');
    }
})();
*/

/*
console.log('1: will get dog pics!');
getDogPic().then(x => {
     console.log(x);
     console.log('3: Done getting dog pics!');
}).catch(err => {
    console.log('ERROR');
});
*/

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    // How to consume promises
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    // returning the dog breeds url
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    // saving the dog breed url to a new file
    console.log('Random dog image saved to file');
  })
  .catch((err) => {
    console.log(err);
  });
  */
