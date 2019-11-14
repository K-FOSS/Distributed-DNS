// Web/UI/Routes/ACMEs/ACME/index.tsx
import React from 'react'
import { useParams } from 'react-router'
import { useAcmeQuery } from './ACME.gen'
import { Header } from 'UI/Components/Styles/Header'
import { PageSectionRoot } from 'UI/Components/Styles/Section/PageSectionRoot'
import { PaperSection } from 'UI/Components/Styles/Section/PaperSection'
import { BaseButton } from 'UI/Components/Styles/Button/BaseButton'
import { useStyles } from 'UI/Components/Styles'

interface ACMEPageParams {
  acmeId: string
}

export default function ACMEPage(): React.ReactElement {
  const classes = useStyles()
  const { acmeId } = useParams<ACMEPageParams>()
  const { data } = useAcmeQuery({ 
    variables: {
      acmeId
    }
  })

  return (
    <>
      <Header title={{ primary: `${data?.ACME.name} ACME` }} />
      <div className={classes.pageRoot}>
        <PageSectionRoot>
          <PaperSection>
            <BaseButton
              label='Save Settings'
              onClick={() => console.log('Saving Settings')}
              color='primary'
              variant='contained'
            />
          </PaperSection>
        </PageSectionRoot>
      </div>
    </>
  )
}