import React from 'react'

import {render, screen} from '@testing-library/react'

import SpaceXProvider from '../SpaceXProvider'

// Sanity test only to show basic set-up
describe("SpaceXProvider", () => {
    it("renders with Foo", () => {
        render(<SpaceXProvider>Foo</SpaceXProvider>)
        expect(screen.queryByText('Foo'))
    });
});