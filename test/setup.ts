/* eslint-disable no-unused-vars */
import chai from 'chai';
import sinonChai from 'sinon-chai';
import * as admin from 'firebase-admin';

const projectId = 'test-project';
const databaseEmulatorPort = 9000;
const firstoreEmulatorPort = 8080;
const databaseURL = `http://localhost:${databaseEmulatorPort}?ns=${projectId}`;

// Set environment variables
process.env.NODE_ENV = 'test';
process.env.GCLOUD_PROJECT = projectId;
process.env.FIREBASE_DATABASE_EMULATOR_HOST = `localhost:${databaseEmulatorPort}`;
process.env.FIRESTORE_EMULATOR_HOST = `localhost:${firstoreEmulatorPort}`;

chai.use(sinonChai);

// Set global variables
(global as any).projectId = projectId;
(global as any).databaseURL = databaseURL;

// Initialize admin SDK with emulator settings for RTDB
admin.initializeApp({
  projectId,
  databaseURL,
  // credential: admin.credential.applicationDefault(),
});

// Initialize Firestore with emulator settings
admin.firestore().settings({
  servicePath: 'localhost',
  port: firstoreEmulatorPort,
});
