// Web/UI/Routes/Subscribers/Subscriber.tsx
import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { SubscriberPage } from 'UI/Components/Subscribers';

interface SubscriberParams {
  subscriberId: string;
}

export default function SubscriberRoute(): React.ReactElement {
  const params = useParams<SubscriberParams>();

  if (!params.subscriberId) return <Redirect to='/' />;
  else return <SubscriberPage subscriberId={params.subscriberId} />;
}
