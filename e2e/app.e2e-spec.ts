import { StopWatchPage } from './app.po';

describe('stop-watch App', function() {
  let page: StopWatchPage;

  beforeEach(() => {
    page = new StopWatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
