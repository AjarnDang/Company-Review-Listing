import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchInput from '../SearchInput';

describe('SearchInput', () => {
  it('should render with placeholder', () => {
    render(<SearchInput placeholder="Search..." />);
    
    expect(screen.getByText('Search...')).toBeInTheDocument();
  });

  it('should render as read-only by default', () => {
    render(<SearchInput placeholder="Search..." />);
    
    const input = screen.queryByRole('textbox');
    expect(input).not.toBeInTheDocument();
  });

  it('should call onClick when clicked in read-only mode', async () => {
    const handleClick = jest.fn();
    render(<SearchInput placeholder="Search..." onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Enter is pressed in read-only mode', () => {
    const handleClick = jest.fn();
    render(<SearchInput placeholder="Search..." onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when Space is pressed in read-only mode', () => {
    const handleClick = jest.fn();
    render(<SearchInput placeholder="Search..." onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: ' ' });
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render as editable input when readOnly is false', () => {
    render(<SearchInput placeholder="Search..." readOnly={false} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('should handle value change in editable mode', async () => {
    const handleChange = jest.fn();
    render(
      <SearchInput
        placeholder="Search..."
        readOnly={false}
        onChange={handleChange}
        value=""
      />
    );
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('should not call onChange in read-only mode', async () => {
    const handleChange = jest.fn();
    render(
      <SearchInput
        placeholder="Search..."
        readOnly={true}
        onChange={handleChange}
      />
    );
    
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should show clear button when value is provided in editable mode', () => {
    const handleClear = jest.fn();
    render(
      <SearchInput
        placeholder="Search..."
        readOnly={false}
        value="test"
        onClear={handleClear}
      />
    );
    
    const clearButton = screen.getByLabelText('Clear search');
    expect(clearButton).toBeInTheDocument();
  });

  it('should call onClear when clear button is clicked', async () => {
    const handleClear = jest.fn();
    render(
      <SearchInput
        placeholder="Search..."
        readOnly={false}
        value="test"
        onClear={handleClear}
      />
    );
    
    const clearButton = screen.getByLabelText('Clear search');
    await userEvent.click(clearButton);
    
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('should not show clear button when value is empty', () => {
    render(
      <SearchInput
        placeholder="Search..."
        readOnly={false}
        value=""
        onClear={jest.fn()}
      />
    );
    
    const clearButton = screen.queryByLabelText('Clear search');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should not show clear button in read-only mode', () => {
    render(
      <SearchInput
        placeholder="Search..."
        readOnly={true}
        value="test"
        onClear={jest.fn()}
      />
    );
    
    const clearButton = screen.queryByLabelText('Clear search');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should handle keyboard events in editable mode', () => {
    const handleKeyDown = jest.fn();
    render(
      <SearchInput
        placeholder="Search..."
        readOnly={false}
        onKeyDown={handleKeyDown}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    const { container } = render(
      <SearchInput placeholder="Search..." className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should have search icon', () => {
    const { container } = render(<SearchInput placeholder="Search..." />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should autofocus input when autoFocus is true', () => {
    render(
      <SearchInput
        placeholder="Search..."
        readOnly={false}
        autoFocus={true}
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autoFocus');
  });

  it('should have correct role for read-only mode', () => {
    render(<SearchInput placeholder="Search..." readOnly={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Search...');
  });

  it('should have correct role for editable mode', () => {
    const { container } = render(
      <SearchInput placeholder="Search..." readOnly={false} />
    );
    
    const searchElement = container.querySelector('[role="search"]');
    expect(searchElement).toBeInTheDocument();
  });

  it('should display provided value in editable mode', () => {
    render(
      <SearchInput
        placeholder="Search..."
        readOnly={false}
        value="test value"
      />
    );
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('should handle empty placeholder', () => {
    render(<SearchInput placeholder="" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should be keyboard accessible in read-only mode', () => {
    render(<SearchInput placeholder="Search..." readOnly={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabIndex', '0');
  });
});

