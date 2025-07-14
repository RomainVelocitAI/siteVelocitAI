import { useState, useCallback } from 'react';

export type AnimationType = 'envelope' | 'sphere' | 'airplane';

interface FormAnimationState {
  isSubmitting: boolean;
  isAnimating: boolean;
  animationType: AnimationType;
  showSuccess: boolean;
}

export function useFormAnimation(initialType: AnimationType = 'airplane') {
  const [state, setState] = useState<FormAnimationState>({
    isSubmitting: false,
    isAnimating: false,
    animationType: initialType,
    showSuccess: false,
  });

  const startSubmission = useCallback((type?: AnimationType) => {
    setState(prev => ({
      ...prev,
      isSubmitting: true,
      isAnimating: true,
      animationType: type || prev.animationType,
      showSuccess: false,
    }));
  }, []);

  const completeAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAnimating: false,
      showSuccess: true,
    }));
  }, []);

  const resetAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      isSubmitting: false,
      isAnimating: false,
      showSuccess: false,
    }));
  }, []);

  const setAnimationType = useCallback((type: AnimationType) => {
    setState(prev => ({
      ...prev,
      animationType: type,
    }));
  }, []);

  return {
    ...state,
    startSubmission,
    completeAnimation,
    resetAnimation,
    setAnimationType,
  };
}