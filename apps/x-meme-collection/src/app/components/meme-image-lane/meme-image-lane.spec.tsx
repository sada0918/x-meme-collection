import { render } from '@testing-library/react';

import MemeImageLane from './memeImageLane';

describe('MemeImageLane', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemeImageLane />);
    expect(baseElement).toBeTruthy();
  });
});
