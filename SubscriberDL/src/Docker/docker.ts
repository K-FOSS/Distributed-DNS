// SubscriberDL/src/Docker/docker.ts
import Docker from 'dockerode'

export const docker = new Docker({ version: 'v1.40' })
