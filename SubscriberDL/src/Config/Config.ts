// SubscriberDL/src/Config/Config.ts
import dotenv from 'dotenv'

dotenv.config()

interface Config {
  apiURL: string
  subscriberToken: string
  dataPath: string
}

export const config: Config = {
  apiURL: process.env.API_URL || 'http://localhost',
  subscriberToken: process.env.SUBSCRIBER_TOKEN!,
  dataPath:
    process.env.DATA_PATH || process.env.NODE_ENV === 'production'
      ? '/data'
      : 'data',
}
