import { StreamClient } from "@stream-io/node-sdk";
// or
// const { StreamClient } = require("@stream-io/node-sdk");

const apiKey = "9bva86s3fcpk";
const secret = "5hvxamuej4wj5pnt5ph48r6zb8eb4zd4xg2qgzutevsjdf8z2gub6fsszxszhu2d";
export const client = new StreamClient(apiKey, secret);

// optionally add timeout to API requests
// the default timeout is 3000ms
// export const client = new StreamClient(apiKey, secret, { timeout: 3000 });
