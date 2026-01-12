import { useEffect } from 'react';

const DynamicTitleHandler = ({ baseTitle, baseDescription, clubName }) => {
  useEffect(() => {
    if (clubName) {
      document.title = `${clubName} | Club Details | ClubSphere`;
    } else {
      document.title = baseTitle || 'Club Details | ClubSphere';
    }

    // Update description meta tag
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    
    if (clubName) {
      descriptionMeta.setAttribute('content', `Details about ${clubName}. Join ${clubName} and connect with like-minded individuals.`);
    } else {
      descriptionMeta.setAttribute('content', baseDescription || 'View detailed information about a specific club on ClubSphere.');
    }

    // Update keywords meta tag
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    
    if (clubName) {
      keywordsMeta.setAttribute('content', `club,${clubName},organization,community,events,membership,social`);
    } else {
      keywordsMeta.setAttribute('content', 'clubs, organizations, community, events, membership, social, networking');
    }

    return () => {
      // Reset to default values when component unmounts
      document.title = 'ClubSphere - Connect & Grow';
    };
  }, [baseTitle, baseDescription, clubName]);

  return null;
};

export default DynamicTitleHandler;