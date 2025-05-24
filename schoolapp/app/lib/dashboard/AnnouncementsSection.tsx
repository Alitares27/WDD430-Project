
import React from 'react';
import AnnouncementCard from './AnnouncementCard';

const AnnouncementsSection: React.FC = () => {

const announcements = [
    {
        id: 'a001',
        title: 'Important Announcement: Enrollment Open',
        date: '05/24/2025',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    },
    {
        id: 'a002',
        title: 'School Sports Day',
        date: '05/10/2025',
        content: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
    },
];

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Announcements</h2>
      <div className="space-y-4"> 
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            title={announcement.title}
            date={announcement.date}
            content={announcement.content}
          />
        ))}
      </div>
    </section>
  );
};

export default AnnouncementsSection;