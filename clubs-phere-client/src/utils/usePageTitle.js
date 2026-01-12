import { useEffect } from 'react';

export const setPageTitle = (title, description) => {
  // Update the page title
  document.title = title || 'ClubSphere - Connect & Grow';
  
  // Update description meta tag
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', description || 'ClubSphere - Connect with clubs and organizations that match your interests. Discover, join, and create communities around shared passions.');
};

export const usePageTitle = (title, description) => {
  useEffect(() => {
    setPageTitle(title, description);

    return () => {
      // Reset to default when component unmounts
      document.title = 'ClubSphere - Connect & Grow';
    };
  }, [title, description]);
};