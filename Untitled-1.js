// Creates a client
                const assistant = new Assistant(/* required credentials */ {
                    type: 'authorized_user',
                    client_id: credentials.installed.client_id,
                    client_secret: credentials.installed.client_secret,
                    refresh_token: credentials.installed.refresh_token,
                    }, /* additional, optional options */ {
                    locale: AssistantLanguage.ITALIAN, // Defaults to AssistantLanguage.ENGLISH (en-US)
                    deviceModelId: 'xxxxxxxx', // use if you've gone through the Device Registration process
                    deviceId: 'xxxxxx', // use if you've gone through the Device Registration process
                
                    });
    
                    // Sends a text query to the assistant
                    assistant.query('Hi!')
                    .then(response => {
                        // response contains all the fields returned by the assistant, such as the text and audio
                        console.log(`Response: ${response.text}`);
                        // response.audio is a Buffer containing the audio response by the assistant
                    })
                    .catch(err => {
                        console.error('ERROR: ', err);
                    });