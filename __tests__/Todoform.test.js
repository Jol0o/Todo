import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoForm from './../app/components/TodoForm';

jest.mock('@supabase/supabase-js', () => ({
    createClient: () => ({
        from: () => ({
            insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
        }),
    }),
}));

describe('TodoForm', () => {
    it('updates input value on change', () => {
        const { getByLabelText } = render(<TodoForm />);
        const input = getByLabelText('Content');
        fireEvent.change(input, { target: { value: 'Test todo' } });
        expect(input.value).toBe('Test todo');
    });

    // Add more tests here
});