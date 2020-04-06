import generateRandomChallengePair from './generateRandomChallengePair';
import parse from 'url-parse';

const qs = parse.qs;
/*
  Generic JavaScript PKCE Client, you can subclass this for React-Native,
  Cordova, Chrome, Some Other Environment which has its own handling for
  OAuth flows (like Windows?)
*/

class PKCEClient {
  private domain: string | undefined;
  private clientId: string | undefined;

  constructor(domain?: string, clientId?: string) {
    this.domain = domain;
    this.clientId = clientId;
  }

  async getAuthResult(url: string, interactive: boolean) {
    throw new Error('Must be implemented by a sub-class');
  }

  getRedirectURL() {
    throw new Error('Must be implemented by a sub-class');
  }

  async exchangeCodeForToken(code: string | undefined, verifier: string) {
    const { domain, clientId } = this;
    const body = JSON.stringify({
      redirect_uri: this.getRedirectURL(),
      grant_type: 'authorization_code',
      code_verifier: verifier,
      client_id: clientId,
      code,
    });
    const result = await fetch(`https://${domain}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (result.ok) return result.json();

    throw Error(result.statusText);
  }

  extractCode(resultUrl: string) {
    const response = parse(resultUrl, true).query;

    if (response.error) {
      throw new Error(response.error_description || response.error);
    }

    return response.code;
  }

  async authenticate(options = {}, interactive = true) {
    const { domain, clientId } = this;
    const { secret, hashed } = generateRandomChallengePair();

    Object.assign(options, {
      client_id: clientId,
      code_challenge: hashed,
      redirect_uri: this.getRedirectURL(),
      code_challenge_method: 'S256',
      response_type: 'code',
    });

    const url = `https://${domain}/authorize?${qs.stringify(options)}`;
    const resultUrl = await this.getAuthResult(url, interactive);
    // @ts-ignore
    const code = this.extractCode(resultUrl);
    return this.exchangeCodeForToken(code, secret);
  }
}

export default PKCEClient;
