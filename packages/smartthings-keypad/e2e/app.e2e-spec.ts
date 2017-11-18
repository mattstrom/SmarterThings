import { SmartthingsKeypadPage } from './app.po';

describe('smartthings-keypad App', () => {
  let page: SmartthingsKeypadPage;

  beforeEach(() => {
    page = new SmartthingsKeypadPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
