import { LeChatNoirPage } from './app.po';

describe('le-chat-noir App', () => {
  let page: LeChatNoirPage;

  beforeEach(() => {
    page = new LeChatNoirPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
