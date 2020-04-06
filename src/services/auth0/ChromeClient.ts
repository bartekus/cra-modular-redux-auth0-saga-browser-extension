import PKCEClient from './PKCEClient';

class ChromeClient extends PKCEClient {
  // @ts-ignore
  getAuthResult(url: string, interactive: boolean) {
    return new Promise((resolve, reject) => {
      chrome.identity.launchWebAuthFlow({ url, interactive }, (callbackURL) => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message));
        }
        resolve(callbackURL);
      });
    });
  }

  getRedirectURL() {
    return chrome.identity.getRedirectURL('auth0');
  }
}

export default ChromeClient;
