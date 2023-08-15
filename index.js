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

// Using asnyc/await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
  }
  return '2: READY!';
};
console.log('1: will get dog pics!');
getDogPic().then(x => {
     console.log(x);
     console.log('3: Done getting dog pics!');
});


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
