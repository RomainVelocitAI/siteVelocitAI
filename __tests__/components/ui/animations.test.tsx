import { render, screen } from '@testing-library/react'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/animations'

describe('Animation Components', () => {
  describe('FadeInUp', () => {
    it('renders children correctly', () => {
      render(
        <FadeInUp>
          <div data-testid="fade-content">Test content</div>
        </FadeInUp>
      )
      
      expect(screen.getByTestId('fade-content')).toBeInTheDocument()
      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <FadeInUp className="custom-class">
          <div>Test content</div>
        </FadeInUp>
      )
      
      const container = screen.getByText('Test content').closest('div')
      expect(container).toHaveClass('custom-class')
    })
  })

  describe('StaggerContainer', () => {
    it('renders children correctly', () => {
      render(
        <StaggerContainer>
          <StaggerItem>
            <div data-testid="stagger-item">Stagger item</div>
          </StaggerItem>
        </StaggerContainer>
      )
      
      expect(screen.getByTestId('stagger-item')).toBeInTheDocument()
    })
  })

  describe('StaggerItem', () => {
    it('renders with custom className', () => {
      render(
        <StaggerItem className="item-class">
          <span data-testid="item-content">Item content</span>
        </StaggerItem>
      )
      
      const container = screen.getByTestId('item-content').closest('div')
      expect(container).toHaveClass('item-class')
    })
  })
})