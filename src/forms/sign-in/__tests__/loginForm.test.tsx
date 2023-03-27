import React from 'react';
import {
  render,
  preview,
  waitFor,
  screen,
  fireEvent,
  act,
} from '../../../jestSetup/render';
import LoginForm from '../index';
import ar from '../../../locales/ar/translation.json';
import en from '../../../locales/en/translation.json';

describe('testing login form behaviour for arabic', () => {
  beforeAll(() => {
    import('../../../jestSetup/bootstrap.rtl.min.css');
    const rootHtml = document.getElementsByTagName('html')[0];
    rootHtml.setAttribute('dir', 'rtl');
    rootHtml.setAttribute('lang', 'rtl');
  });
  it('should enables the login button using query', async () => {
    const { container } = render(<LoginForm />);
    const emailInput = container.querySelector(
      'input:first-child'
    ) as HTMLInputElement;
    const passwordInput = container.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement;
    const loginButton = container.querySelector('button') as HTMLInputElement;
    await act(() => {
      fireEvent.change(emailInput, { target: { value: 'ash@ash.com' } });
      fireEvent.blur(emailInput);
    });
    await act(() => {
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.blur(passwordInput);
    });
    preview.debug();
    await waitFor(() => {
      expect(loginButton).toBeEnabled();
    });
  });
});

describe('testing login form behaviour for english', () => {
  beforeAll(() => {
    import('../../../jestSetup/bootstrap.min.css');
    const rootHtml = document.getElementsByTagName('html')[0];
    rootHtml.setAttribute('dir', 'ltr');
    rootHtml.setAttribute('lang', 'ltr');
  });
  it('should enables the login button using screen', async () => {
    render(<LoginForm />);
    const emailInput = await waitFor(() =>
      screen.getByPlaceholderText(/example@mail\.com/i)
    );
    const passwordInput = await waitFor(() =>
      screen.getByPlaceholderText(/enter your password/i)
    );
    const loginButton = await waitFor(() =>
      screen.getByRole('button', { name: /login/i })
    );
    await act(() => {
      fireEvent.change(emailInput, { target: { value: 'ash@ash.com' } });
      fireEvent.blur(emailInput);
    });
    await act(() => {
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.blur(passwordInput);
    });
    preview.debug();
    await waitFor(() => {
      expect(loginButton).toBeEnabled();
    });
  });
});
