// SubscriberDL/src/Docker/restartBIND.ts
import { docker } from '.'

export async function restartBINDContainer(): Promise<void> {
  const bindContainers = await docker.listContainers({
    all: true,
    limit: 1,
    filters: '{"label": ["com.distributed-dns.bind=true"]}',
  })
  if (!bindContainers[0]) throw new Error('BIND CONTAINER INVALID')
  const bindContainer = bindContainers[0]

  const container = docker.getContainer(bindContainer.Id)

  return container.restart()
}
