const path = require('path');

const config = {
  auth: {
      keyFilePath: path.resolve('oauth.json'),
      savedTokensPath: path.resolve('../../token.json'),
    },
  conversation: {
    audio: {
      encodingIn: 'LINEAR16',
      sampleRateIn: 16000,
      encodingOut: 'OPUS_IN_OGG', // supported are LINEAR16 / MP3 / OPUS_IN_OGG (defaults to LINEAR16)
      sampleRateOut: 24000,
    },
    lang: 'it-IT',
    deviceModelId: 'xxxxxxxx',
    deviceId: 'xxxxxx',
    deviceLocation: {
      coordinates: {
        latitude: 45.0819359,
        longitude: 7.659093,
      },
    },
    textQuery: '',
    isNew: true,
    screen: {
      isOn: true,
    }
  },
};

module.exports = {
	config:config
}