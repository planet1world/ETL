import { WebEtlV2Page } from './app.po';

describe('web-etl-v2 App', () => {
  let page: WebEtlV2Page;

  beforeEach(() => {
    page = new WebEtlV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
