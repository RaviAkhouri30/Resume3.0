import { ServiceProviderFactory } from './service-provider-factory';

describe('ServiceProviderFactory', () => {
  it('should create an instance', () => {
    expect(new ServiceProviderFactory()).toBeTruthy();
  });
});
