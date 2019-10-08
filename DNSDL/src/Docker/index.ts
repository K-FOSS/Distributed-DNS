// DNSDL/src/Docker/index.ts
import Dockerode from 'dockerode';

const NS_CONTAINER = process.env.NS_CONTAINER || 'NS';

const docker = new Dockerode({ version: 'v1.40' });

export async function restartContainer(): Promise<void> {
  const containers = await docker.listContainers();
  const container = containers.find(({ Names }) =>
    Names.includes(`/${NS_CONTAINER}`)
  );
  const cont = await docker.getContainer(container.Id);
  return cont.restart();
}
