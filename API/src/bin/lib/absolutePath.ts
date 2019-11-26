import { resolve } from 'path'

export default function absolutePath(path: string) {
  return resolve(`${__dirname}/../../../${path}`)
}
