// Google Analytics 4 configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (action: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('event', action, parameters);
  }
};

// Track calculator usage
export const trackCalculatorEvent = (eventType: 'task_added' | 'task_removed' | 'calculation_completed', data?: Record<string, any>) => {
  event(`calculator_${eventType}`, {
    event_category: 'calculator',
    ...data
  });
};

// Track form submissions
export const trackFormSubmission = (formType: 'contact' | 'whatsapp' | 'email', success: boolean) => {
  event('form_submission', {
    event_category: 'engagement',
    form_type: formType,
    success: success
  });
};

// Track video plays
export const trackVideoPlay = (videoName: string) => {
  event('video_play', {
    event_category: 'engagement',
    video_name: videoName
  });
};

// Track section views
export const trackSectionView = (sectionName: string) => {
  event('section_view', {
    event_category: 'engagement',
    section_name: sectionName
  });
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}