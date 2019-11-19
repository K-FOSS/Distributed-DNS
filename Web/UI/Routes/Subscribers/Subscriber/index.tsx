// Web/UI/Routes/Subscribers/Subscriber/index.tsx
import React from 'react';
import { Header } from 'UI/Components/Styles/Header';
import { useParams } from 'react-router';
import { useSubscriberQuery } from './Subscriber.gen';

interface SubscriberPageParams {
  subscriberId: string;
}

export default function SubscriberPage(): React.ReactElement {
  const { subscriberId } = useParams<SubscriberPageParams>();

  const { data } = useSubscriberQuery({ variables: { subscriberId } });

  return (
    <>
      <Header title={{ primary: `${data?.subscriber.name} Subscriber` }} />
    </>
  );
}
