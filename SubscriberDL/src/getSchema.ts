import fetch from 'node-fetch'
import fs from 'fs'
import { config } from './Config'

fetch(`${config.apiURL}/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      (type) => type.possibleTypes !== null,
    )
    result.data.__schema.types = filteredData
    fs.writeFileSync(
      `${__dirname}/fragmentTypes.json`,
      JSON.stringify(result.data),
      // @ts-ignore
      (err) => {
        if (err) {
          console.error('Error writing fragmentTypes file', err)
        } else {
          console.log('Fragment types successfully extracted!')
        }
      },
    )
  })
