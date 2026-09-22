import { ApiServiceProviderFactory } from './api-service-provider-factory';

describe('ServiceProviderFactory', () => {
  it('should create an instance', () => {
    expect(new ApiServiceProviderFactory()).toBeTruthy();
  });
});
