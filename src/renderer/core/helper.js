import fs from 'fs';

export function generateID(length) {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

export function getLibVersion(path) {
  let data = fs.readFileSync(path);
  let version_regex = /v\d{1}\.\d{1}\.\d{1}/;
  let matches = version_regex.exec(data);
  return matches[0];
}
