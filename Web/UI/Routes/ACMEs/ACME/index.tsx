// Web/UI/Routes/ACMEs/ACME/index.tsx
import React from 'react';
import { useParams } from 'react-router';
import { useStyles } from 'UI/Components/Styles';
import { Header } from 'UI/Components/Styles/Header';
import { PageSectionRoot } from 'UI/Components/Styles/Section/PageSectionRoot';
import { useAcmeQuery } from './ACME.gen';
import { ACMECertificatesPanel } from './ACMECertficatesPanel';
import { ACMEDomainsPanel } from './ACMEDomainsPanel';

interface ACMEPageParams {
  acmeId: string;
}

export default function ACMEPage(): React.ReactElement {
  const classes = useStyles();
  const { acmeId } = useParams<ACMEPageParams>();
  const { data } = useAcmeQuery({
    variables: {
      acmeId,
    },
  });

  return (
    <>
      <Header title={{ primary: `${data?.ACME.name} ACME` }} />
      <div className={classes.pageRoot}>
        <PageSectionRoot>
          <ACMEDomainsPanel acmeData={data} />

          <ACMECertificatesPanel certificates={data?.ACME.certificates} />
        </PageSectionRoot>
      </div>
    </>
  );
}
