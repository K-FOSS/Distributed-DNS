// API/src/Modules/Utilities/hasSetup.ts
import { createMethodDecorator } from 'type-graphql';
import { Configuration } from 'API/Modules/Configurations/ConfigurationModel';
import { ApolloError } from 'apollo-server-koa';

export const hasSetup = (wantedState: boolean) =>
  createMethodDecorator(async ({ args }, next) => {
    const isSetup = await Configuration.hasCompletedSetup();

    if (isSetup !== wantedState) {
      if (wantedState === false)
        throw new ApolloError('Setup has already been completed', 'HAS_SETUP');
      else if (wantedState === true)
        throw new ApolloError(`Setup has not been completed yet`, 'HAS_SETUP');
    }

    return next();
  });
