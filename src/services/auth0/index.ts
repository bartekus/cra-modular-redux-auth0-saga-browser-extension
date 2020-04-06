import ChromeClient from './ChromeClient';

const chromeClient = new ChromeClient(process.env.REACT_APP_AUTH0_DOMAIN, process.env.REACT_APP_AUTH0_CLIENT_ID);
const localStorageKey = 'loggedIn';

// scope
//  - openid if you want an id_token returned
//  - offline_access if you want a refresh_token returned device
//  - required if requesting the offline_access scope.
const options = {
  scope: 'openid offline_access',
  device: 'chrome-extension',
};

class AuthService {
  private access_token: string | undefined;
  private refresh_token: string | undefined;
  private id_token: string | undefined;
  private scope: string | undefined;
  private expires_in: number | undefined;
  private token_type: string | undefined;

  signIn = () => {
    return chromeClient.authenticate(options);
  };

  localLogin = (authResult: any) => {
    this.access_token = authResult.access_token;
    this.refresh_token = authResult.refresh_token;
    this.id_token = authResult.id_token;
    this.scope = authResult.scope;
    this.expires_in = authResult.expires_in;
    this.token_type = authResult.token_type;

    localStorage.setItem(localStorageKey, 'true');
  };

  signOut = () => {
    this.access_token = undefined;
    this.refresh_token = undefined;
    this.id_token = undefined;
    this.scope = undefined;
    this.expires_in = undefined;
    this.token_type = undefined;

    localStorage.setItem(localStorageKey, 'false');
  };
}

export default new AuthService();
