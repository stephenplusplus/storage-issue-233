const uuid = require('uuid');
const ava = require('ava');
const requestPromise = require('request-promise');
const storage = require('@google-cloud/storage')()

const BASE_URL = 'https://us-central1-nodejs-docs-samples.cloudfunctions.net'

ava('should create a real bucket', async t => {
  const name = `gcf-test-${uuid.v4()}`;
  const url = `${BASE_URL}/createBucket`;
  await requestPromise.post(url, { name: name });
  await setTimeout(Promise.resolve, 1000);
  const exists = await storage.bucket(name).exists(); // CRASHES
  t.is(exists, true);
})