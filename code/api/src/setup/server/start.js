// Imports
import ip from 'ip'
import mongoose from 'mongoose'
import cors from "cors";
// App Imports
import { PORT, NODE_ENV } from '../config/env'

// Start server
export default function (server) {
  console.info('SETUP - Starting server..')

  const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }

  server.use(cors(corsOptions)) // Use this after the variable declaration

  const serverProcess = server.listen(PORT, (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.')
    } else {
      console.info(`INFO - Server started on`)
      console.info(`  Local   http://localhost:${PORT} [${NODE_ENV}]`)
      console.info(`  Network http://${ip.address()}:${PORT} [${NODE_ENV}]`)
      console.info(`  Datetime ${new Date()}\n`)
    }
  })

  // Stop Server
  for (let signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, function () {
      console.info('INFO - Shutting down server..')

      serverProcess.close(function () {
        console.info('INFO - Server has been shut down.')

        mongoose.connection.close(false, () => {
          console.info('INFO - Database disconnected.')

          process.exit(0)
        })
      })
    })
  }
}
