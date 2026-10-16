// import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";

// // 🔹 MSAL config
// const msalConfig = {
//   auth: {
//     clientId: "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
//     authority: "https://login.microsoftonline.com/common",
//   },
//   cache: {
//     cacheLocation: "localStorage",
//     storeAuthStateInCookie: true,
//   },
// };

// const msalInstance = new PublicClientApplication(msalConfig);

// const graphRequest = {
//   scopes: [
//     "https://graph.microsoft.com/User.Read",
//     "https://graph.microsoft.com/Team.ReadBasic.All",
//   ],
// };

// // 🔥 SINGLE SOURCE OF TOKEN
// export const getAccessToken = async (): Promise<string> => {
//   await msalInstance.initialize();

//   const accounts = msalInstance.getAllAccounts();

//   if (!accounts || accounts.length === 0) {
//     throw new Error("User not logged in");
//   }

//   try {
//     const result = await msalInstance.acquireTokenSilent({
//       ...graphRequest,
//       account: accounts[0],
//     });

//     return result.accessToken;

//   } catch (err) {
//     if (err instanceof InteractionRequiredAuthError) {
//       const result = await msalInstance.acquireTokenPopup(graphRequest);
//       return result.accessToken;
//     }
//     throw err;
//   }
// };
// export const loginIfNeeded = async (): Promise<void> => {
//   await msalInstance.initialize();

//   const accounts = msalInstance.getAllAccounts();
//   if (accounts.length > 0) return; // already logged in

//   await msalInstance.loginPopup({
//     scopes: [
//       "https://graph.microsoft.com/User.Read",
//       "https://graph.microsoft.com/Team.ReadBasic.All",
//     ],
//   });
// };

/////////////////SECONDDDDDDDDDDDDDDDDDDDD/////////////////////
// import {
//   PublicClientApplication,
//   InteractionRequiredAuthError,
// } from "@azure/msal-browser";

// const msalConfig = {
//   auth: {
//     clientId: "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
//     authority: "https://login.microsoftonline.com/00175dea-da9a-4dfa-8dd0-7f96eb63ace0",
//   },
//   cache: {
//     cacheLocation: "localStorage",
//     storeAuthStateInCookie: true,
//   },
// };

// const msalInstance = new PublicClientApplication(msalConfig);

// const graphRequest = {
//   scopes: [
//     "https://graph.microsoft.com/User.Read",
//     "https://graph.microsoft.com/Team.ReadBasic.All",
//   ],
// };

// let initialized = false;
// const initMsal = async () => {
//   if (!initialized) {
//     await msalInstance.initialize();
//     initialized = true;
//   }
// };

// // export const loginIfNeeded = async (): Promise<void> => {
// //   await initMsal();

// //   const accounts = msalInstance.getAllAccounts();
// //   if (accounts.length > 0) return;

// //   const response = await msalInstance.loginPopup({
// //     scopes: graphRequest.scopes,
// //   });

// //   msalInstance.setActiveAccount(response.account);
// // };

// export const getAccessTokenLogin = async (): Promise<string> => {
//   await initMsal();

//   const account =
//     msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0];

//   if (!account) {
//     throw new Error("User not logged in");
//   }

//   try {
//     const result = await msalInstance.acquireTokenSilent({
//       ...graphRequest,
//       account,
//     });

//     return result.accessToken;
//   } catch (err) {
//     if (err instanceof InteractionRequiredAuthError) {
//       const result = await msalInstance.acquireTokenPopup(graphRequest);
//       return result.accessToken;
//     }
//     throw err;
//   }
// };

// export const loginIfNeeded = async (): Promise<void> => {
//   await initMsal();

//   const accounts = msalInstance.getAllAccounts();
//   if (accounts.length > 0) {
//     const account = accounts[0];
//     msalInstance.setActiveAccount(account);
//     console.log("User already logged in:", account);
//     // ✅ store user id once
//     localStorage.setItem("userId", account.localAccountId);
//     localStorage.setItem("userEmail", account.username);
//     return;
//   }

//   const response = await msalInstance.loginPopup({
//     scopes: graphRequest.scopes,
//   });

//   msalInstance.setActiveAccount(response.account);
//  console.log("User already logged in2222:", response.account);
//   // ✅ store user id after successful login
//   localStorage.setItem("userId", response.account.localAccountId);
//   localStorage.setItem("userEmail", response.account.username);
// };
///////////////////THIRDDDDDDDDDDDDDDDDDDDD/////////////////////

import {
  PublicClientApplication,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
    authority: "https://login.microsoftonline.com/00175dea-da9a-4dfa-8dd0-7f96eb63ace0",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

// const graphRequest = {
//   scopes: [
//     "https://graph.microsoft.com/User.Read",
//     "https://graph.microsoft.com/Team.ReadBasic.All",
//   ],
// };
// const graphRequest = {
//   scopes: [
//     "https://graph.microsoft.com/User.Read",
//     "https://graph.microsoft.com/Group.ReadWrite.All",
//     "https://graph.microsoft.com/Channel.ReadWrite.All","https://graph.microsoft.com/Team.ReadWrite.All"
//   ],
// };
const graphRequest = {
  scopes: [
    "User.Read",
    "Group.ReadWrite.All",
    "Team.Create",
    "Team.ReadBasic.All",
    "TeamsActivity.Send" // 👈 Add this line
  ],
};




let initialized = false;
const initMsal = async () => {
  if (!initialized) {
    await msalInstance.initialize();
    initialized = true;
  }
};

// MSAL only allows one interactive (popup) request at a time across the whole
// app. Several components call loginIfNeeded()/getAccessTokenLogin() on mount
// concurrently, so without this lock a second popup call throws
// "interaction_in_progress" instead of reusing the first one's result.
let pendingInteraction: Promise<any> | null = null;
const runInteractive = async <T,>(fn: () => Promise<T>): Promise<T> => {
  while (pendingInteraction) {
    try {
      await pendingInteraction;
    } catch {
      // the original caller already handles/reports this failure
    }
  }
  const promise = fn();
  pendingInteraction = promise;
  try {
    return await promise;
  } finally {
    pendingInteraction = null;
  }
};

// ✅ LOGIN (once)
export const loginIfNeeded = async (): Promise<void> => {
  await initMsal();

  const accounts = msalInstance.getAllAccounts();
  let account = accounts[0];

  if (!account) {
    const response = await runInteractive(() =>
      msalInstance.loginPopup({ scopes: graphRequest.scopes })
    );
    account = response.account!;
  }

  msalInstance.setActiveAccount(account);

  // ✅ store stable user info
//   localStorage.setItem("userId", account.homeAccountId);
 localStorage.setItem("userId", account.localAccountId);
  localStorage.setItem("userEmail", account.username);
};

// ✅ TOKEN (anytime, any component)
export const getAccessTokenLogin = async (): Promise<string> => {
  await initMsal();

  let account = msalInstance.getActiveAccount();
  if (!account) {
    account = msalInstance.getAllAccounts()[0];
    if (account) msalInstance.setActiveAccount(account);
  }

  if (!account) {
    throw new Error("User not logged in");
  }

  try {
    const result = await msalInstance.acquireTokenSilent({
      ...graphRequest,
      account,
    });
    return result.accessToken;
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      const result = await runInteractive(() =>
        msalInstance.acquireTokenPopup(graphRequest)
      );
      return result.accessToken;
    }
    throw err;
  }
};
 
