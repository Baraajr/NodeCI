// npm module to check the session signature => session.sig stored in the cookies
const keygrip = require('keygrip');

const keys = require('../../config/keys'); // predefined unique keys

// creating a keygrip to to create a session signature
const keyGrip = new keygrip([keys.cookieKey]);

module.exports = (user) => {
  //user is a mongo document
  // it is a copy that looks like how session is stored in cookies
  const sessionObject = {
    passport: {
      user: user._id.toString(), //user._id is an object so we use tostring to get the id
    },
  };
  //using the Buffer module to create a session string
  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64'); // no need to require the buffer module

  const sig = keyGrip.sign('session=' + session);
  // console.log(session, sig);

  return { session, sig };
};
