// Imports
import express from 'express'

// App Imports
import database from './setup/server/database'
import middlewares from './setup/server/middlewares'
import upload from './setup/server/upload'
import endpoint from './setup/server/endpoint'
import start from './setup/server/start'
import cors from "cors";
// Create express server
const server = express()

// ADD THIS
server.use(cors());
// Connect database
database()

// Setup middlewares
middlewares(server)

// Setup uploads
upload(server)

// Setup endpoint
endpoint(server)

// Start server
start(server)
