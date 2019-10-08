// API/src/Modules/Utilities/UtilitiesResolver.ts
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Utility } from './UtilityModel';
import { CreateUtilityInput } from './CreateUtilityInput';

@Resolver(() => Utility)
export class UtilitiesResolver {
  @Query(() => [Utility])
  async utilities(): Promise<Utility[]> {
    return Utility.find();
  }

  @Query(() => String)
  helloWorld(): string {
    return 'helloWorld'
  }

  @Mutation(() => Utility)
  async createUtility(
    @Arg('input') input: CreateUtilityInput,
  ): Promise<Utility> {
    return Utility.create(input).save();
  }
}
