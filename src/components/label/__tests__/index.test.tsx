import React from 'react';
import {
  render,
  preview,
  waitFor,
  screen,
  fireEvent,
  act,
} from '../../../jestSetup/render';
import Label from '@components/label';

describe('testing behaviour for arabic', () => {
  beforeAll(() => {
    import('../../../jestSetup/bootstrap.rtl.min.css');
    const rootHtml = document.getElementsByTagName('html')[0];
    rootHtml.setAttribute('dir', 'rtl');
  });
  it('should render', async () => {
    const { container } = render(<Label text='test' />);
    preview.debug();
    await waitFor(() => {
      expect(container).toHaveTextContent(/test/);
    });
  });
});
