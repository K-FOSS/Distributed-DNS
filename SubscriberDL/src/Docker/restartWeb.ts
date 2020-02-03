// SubscriberDL/src/Docker/restartWeb.ts
import { docker } from '.'

export async function restartWebContainer(): Promise<void> {
  const webContainers = await docker.listContainers({
    all: true,
    limit: 1,
    filters: '{"label": ["com.distributed-dns.web=true"]}',
  })
  if (!webContainers[0]) throw new Error('Web CONTAINER INVALID')
  const bindContainer = webContainers[0]

  const container = docker.getContainer(bindContainer.Id)

  return container.restart()
}
