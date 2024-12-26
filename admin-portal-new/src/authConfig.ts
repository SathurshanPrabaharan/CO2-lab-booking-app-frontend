import { LogLevel } from "@azure/msal-browser";


// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito


export const msalConfig = {
    auth: {
        clientId: "9a8c4461-0309-4275-abb6-71f21479002e",
        authority: "https://login.microsoftonline.com/sathurshanath2021gmail.onmicrosoft.com",
        redirectUri: "http://localhost:5173/",
        postLogoutRedirectUri: "/",
    },
    // cache: {
    //     // cacheLocation: "sessionStorage",
    //     cacheLocation: "localStorage",
    //     storeAuthStateInCookie: isIE || isEdge || isFirefox,
    // },
    system: {
        allowNativeBroker: false, // Disables WAM Broker
        loggerOptions: {
            loggerCallback: (level:any,message:any,containsPii:any)=> {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

// const msalInstance = new PublicClientApplication(msalConfig);

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"],
    // scopes: [],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
};

// // Add here scopes for access token to be used at MS Graph API endpoints.
// export const tokenRequest = {
//     scopes: ["Mail.Read", "User.Read","profile", "email"],
//     forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
// };

// export const silentRequest = {
//     scopes: ["openid", "profile", "User.Read", "Mail.Read"],
// };

// export const logoutRequest = {};