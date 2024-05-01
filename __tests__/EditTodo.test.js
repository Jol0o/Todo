import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditTodo from './../app/components/EditTodo';

jest.mock('@supabase/supabase-js', () => ({
    createClient: () => ({
        from: () => ({
            update: jest.fn().mockResolvedValue({ data: {}, error: null }),
            match: jest.fn(),
        }),
    }),
}));

describe('EditTodo', () => {
    const todo = { id: 1, content: 'Test todo' };

    it('updates input value on change', () => {
        const { getByLabelText, getByText } = render(<EditTodo todo={todo} />);
        fireEvent.click(getByText('Edit')); // Simulate a click event on the 'Edit' button
        const input = getByLabelText('Content');
        fireEvent.change(input, { target: { value: 'Updated todo' } });
        expect(input.value).toBe('Updated todo');
    });

    // Add more tests here
});