import { render } from '@testing-library/react';

import TweetContainer from './tweet-container';

describe('TweetContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TweetContainer />);
    expect(baseElement).toBeTruthy();
  });
});
