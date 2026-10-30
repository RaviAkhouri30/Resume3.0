import { LoaderService } from './loader-service';

describe('LoaderService', () => {
  it('stays visible until every request has finished and never goes negative', () => {
    const loader = new LoaderService();

    loader.show();
    loader.show();
    loader.hide();
    expect(loader.isLoading()).toBeTrue();

    loader.hide();
    loader.hide();
    expect(loader.isLoading()).toBeFalse();

    loader.show();
    expect(loader.isLoading()).toBeTrue();
  });
});
