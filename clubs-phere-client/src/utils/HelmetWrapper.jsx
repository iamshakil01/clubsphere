import { useEffect } from 'react';

const HelmetWrapper = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update the page title
    document.title = title || 'ClubSphere - Connect & Grow';
    
    // Update or create description meta tag
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', description || 'ClubSphere - Connect with clubs and organizations that match your interests. Discover, join, and create communities around shared passions.');

    // Update or create keywords meta tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', keywords || 'clubs, organizations, community, events, membership, social, networking');

    // Update or create author meta tag
    let authorMeta = document.querySelector('meta[name="author"]');
    if (!authorMeta) {
      authorMeta = document.createElement('meta');
      authorMeta.setAttribute('name', 'author');
      document.head.appendChild(authorMeta);
    }
    authorMeta.setAttribute('content', 'ClubSphere');

    // Set default viewport meta if not present
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
      document.head.appendChild(viewportMeta);
    }

    return () => {
      // Reset to default values when component unmounts
      document.title = 'ClubSphere - Connect & Grow';
    };
  }, [title, description, keywords]);

  return null;
};

export default HelmetWrapper;