import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CalculatorProvider, useCalculator } from '@/contexts/CalculatorContext'

// Test component to access context
const TestComponent = () => {
  const { tasks, addTask, removeTask, updateTask, result } = useCalculator()
  
  return (
    <div>
      <div data-testid="tasks-count">{tasks.length}</div>
      <div data-testid="total-cost">{result.totalYearlyCost}</div>
      <button onClick={addTask} data-testid="add-task">Add Task</button>
      {tasks.length > 1 && (
        <button 
          onClick={() => removeTask(tasks[0].id)} 
          data-testid="remove-task"
        >
          Remove Task
        </button>
      )}
      <button 
        onClick={() => updateTask(tasks[0]?.id, 'timeSpent', 5)} 
        data-testid="update-task"
      >
        Update Task
      </button>
    </div>
  )
}

const WrappedTestComponent = () => (
  <CalculatorProvider>
    <TestComponent />
  </CalculatorProvider>
)

describe('CalculatorContext', () => {
  it('provides initial empty state', () => {
    render(<WrappedTestComponent />)
    
    expect(screen.getByTestId('tasks-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total-cost')).toHaveTextContent('0')
  })

  it('adds tasks correctly', async () => {
    render(<WrappedTestComponent />)
    
    const addButton = screen.getByTestId('add-task')
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('tasks-count')).toHaveTextContent('1')
    })
  })

  it('removes tasks correctly', async () => {
    render(<WrappedTestComponent />)
    
    // Add two tasks first
    const addButton = screen.getByTestId('add-task')
    fireEvent.click(addButton)
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('tasks-count')).toHaveTextContent('2')
    })

    // Remove one task
    const removeButton = screen.getByTestId('remove-task')
    fireEvent.click(removeButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('tasks-count')).toHaveTextContent('1')
    })
  })

  it('updates task properties correctly', async () => {
    render(<WrappedTestComponent />)
    
    // Add a task first
    const addButton = screen.getByTestId('add-task')
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('tasks-count')).toHaveTextContent('1')
    })

    // Update the task
    const updateButton = screen.getByTestId('update-task')
    fireEvent.click(updateButton)
    
    // The cost should be calculated and updated
    await waitFor(() => {
      const totalCost = parseFloat(screen.getByTestId('total-cost').textContent || '0')
      expect(totalCost).toBeGreaterThan(0)
    })
  })

  it('calculates savings correctly', async () => {
    render(<WrappedTestComponent />)
    
    const addButton = screen.getByTestId('add-task')
    fireEvent.click(addButton)
    
    await waitFor(() => {
      const totalCost = parseFloat(screen.getByTestId('total-cost').textContent || '0')
      // Should calculate cost based on default values (1h * 5 days * 4.33 weeks * 12 months * 1 person * 15€/h)
      expect(totalCost).toBeCloseTo(3897, 0)
    })
  })
})