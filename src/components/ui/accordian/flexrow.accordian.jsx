import { useState } from "react";

const FlexRowAccordion = ({ title, contents }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-start justify-between space-y-2 mb-2">
      <div onClick={() => setIsOpen(!isOpen)} className="flex flex-col items-start justify-between w-full space-y-1">
        <div className="flex flex-row items-center justify-between w-full h-full">
          <p className='font-["Montserrat"] text-sm font-semibold text-gray-800 dark:text-dark-text'>{title}</p>
          {isOpen ? (
            <div className="flex items-center justify-center h-full">
              <img src="/Images/ArrowAccordionOpened.png" alt="arrow" className="h-full" />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <img src="/Images/ArrowAccordionClosed.png" alt="arrow" className="h-full" />
            </div>
          )}
        </div>

        {isOpen && (
          <div className='font-["Montserrat"] text-sm border-l-2 border-neutral-200 dark:border-neutral-700 pl-2 w-full'>
            {contents.map((content, index) => (
              <div className="flex flex-row items-center justify-between w-full pr-2 space-x-4" key={index}>
                <p className='text-xs mt-2 font-["Montserrat"] whitespace-nowrap font-semibold text-gray-700 dark:text-dark-text/80'>{content.field}</p>

                <p className='w-full text-end text-xs mt-2 font-["Montserrat"] break-words font-semibold text-gray-900 dark:text-dark-text'>{content.value === "" ? "-" : content.value}</p>

                {content.link && (
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={content.link}
                    className='w-full mt-2 font-["Montserrat"] whitespace-nowrap overflow-hidden text-ellipsis text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline hover:no-underline transition-colors duration-200'
                  >
                    {content.link === "" ? "-" : content.link}
                  </a>
                )}

                {content.phone && (
                  <a href={content.phone} className='w-full mt-2 font-["Montserrat"] text-end text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline hover:no-underline transition-colors duration-200'>
                    {content.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlexRowAccordion;
