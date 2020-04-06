import React from 'react';
import { useSelector } from 'react-redux';

export default function Auth0() {
  // const dispatch = useDispatch();

  // @ts-ignore
  const authenticated = useSelector((store) => store.auth0?.authenticated);
  // @ts-ignore
  const authenticatePending = useSelector((store) => store.auth0?.authenticatePending);

  const onSignIn = () => chrome.runtime.sendMessage({ type: 'authenticate' });
  const onSignOut = () => chrome.runtime.sendMessage({ type: 'deauthentication' });

  return (
    <div>
      <p>
        {authenticated ? (
          <button onClick={onSignOut} disabled={authenticatePending}>
            Logout
          </button>
        ) : (
          <button onClick={onSignIn} disabled={authenticatePending}>
            Login
          </button>
        )}
      </p>
    </div>
  );
}
