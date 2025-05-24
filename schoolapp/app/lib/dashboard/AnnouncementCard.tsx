
import React from 'react';
import Image from 'next/image'; 

interface AnnouncementCardProps {
  title: string;
  date: string;
  imageUrl?: string; 
  content: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ title, date, imageUrl, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-4">
      {/* Sección de la Imagen (Placeholder) */}
      <div className="flex-shrink-0 w-full md:w-48 h-32 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Imagen de ${title}`}
            width={192} // 48 * 4 (Tailwind w-48)
            height={128} // 32 * 4 (Tailwind h-32)
            objectFit="cover"
            className="w-full h-full"
          />
        ) : (
          <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18a.75.75 0 00.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.69a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {/* Contenido del Anuncio */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4"> 
          {content}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;