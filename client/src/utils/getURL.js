function GetURL() {
  if (window.location.hostname === "localhost") {
    return process.env.REACT_APP_DESKTOP_URL;
  }
  if (window.location.hostname.startsWith("192.168")) {
    return process.env.REACT_APP_MOBILE_URL;
  }
}

export default GetURL;
