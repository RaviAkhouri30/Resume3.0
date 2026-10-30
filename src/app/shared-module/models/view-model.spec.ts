import { firstValueFrom, Observable, of, tap, toArray } from 'rxjs';
import { ViewModel } from './view-model';

class TestViewModel extends ViewModel<string> {
  public commandsHandled = 0;

  constructor() {
    super('initial');
  }

  protected override attachViewHandler(): Observable<unknown> {
    return of('loaded').pipe(tap(value => this.setData(value)));
  }

  protected override attachCommandHandler(): Observable<unknown> {
    return of(1).pipe(tap(() => this.commandsHandled++));
  }
}

describe('ViewModel', () => {
  it('starts with the initial state', () => {
    expect(new TestViewModel().data()).toBe('initial');
  });

  it('runs view and command handlers on init without leaking their values', async () => {
    const viewModel = new TestViewModel();

    const emitted = await firstValueFrom(viewModel.init().pipe(toArray()));

    expect(emitted).toEqual([]);
    expect(viewModel.data()).toBe('loaded');
    expect(viewModel.commandsHandled).toBe(1);
  });
});
