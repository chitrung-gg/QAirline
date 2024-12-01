'use client';

import { 
    MdOutlineAirplaneTicket, // flight data
    MdOutlineAirplanemodeActive, // aircraft data
    MdOutlineHome, // statistics
    MdAddCircleOutline, // add new information
    MdOutlineDoDisturbOn,
    MdOutlineArticle, // news general
    MdOutlineDiscount, // promotion
} from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { 
        name: 'Home', 
        href: '/admin', 
        icon: MdOutlineHome 
    },
    {
        name: 'Đăng thông tin',
        icon: MdAddCircleOutline,
        isGroup: true, 
        children: [
          { name: 'Chung', href: '/admin/post-info/general', icon: MdOutlineArticle },
          { name: 'Khuyến mại', href: '/admin/post-info/promotion', icon: MdOutlineDiscount },
        ]
      },
    { 
        name: 'Tàu bay', 
        href: '/admin/aircraft', 
        icon: MdOutlineAirplanemodeActive 
    },
    { 
        name: 'Chuyến bay', 
        href: '/admin/flight', 
        icon: MdOutlineAirplaneTicket 
    },
];

export default function NavLinks() {
    const pathname = usePathname();
    const [isPostInfoOpen, setIsPostInfoOpen] = useState(false);

    return (
        <>
          {links.map((link) => {
            const LinkIcon = link.icon;
    
            if (link.isGroup) {
              return (
                <div key={link.name} className= 'flex flex-row grow justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:grow-0'>
                  <button
                    onClick={() => setIsPostInfoOpen(!isPostInfoOpen)} 
                    className={clsx(
                      'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-2xl md:text-lg font-medium hover:text-blue-normal md:flex-none md:justify-start md:p-2 md:px-3',
                    )}
                  >
                    {isPostInfoOpen ? (
                      <MdOutlineDoDisturbOn className="w-6" />
                    ) : (
                      <MdAddCircleOutline className="w-6" />
                    )}
                    <p className="hidden md:block">{link.name}</p>
                  </button>
    
                  {isPostInfoOpen && link.children.map((child) => {
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        color="foreground"
                        className={clsx(
                          'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-2xl md:text-lg hover:text-blue-normal font-medium md:flex-none md:justify-start md:p-2 md:px-3',
                          {
                            'text-blue-normal': pathname === child.href,
                          }
                        )}
                      >
                        <child.icon className="w-6" />
                        <p className="hidden md:block">{child.name}</p>
                      </Link>
                    );
                  })}
                </div>
              );
            }
    
            // Render normal links
            return (
              <Link
                key={link.name}
                href={link.href || '/'}
                color="foreground"
                className={clsx(
                  'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-2xl md:text-lg font-medium hover:text-blue-normal md:flex-none md:justify-start md:p-2 md:px-3',
                  {
                    'text-blue-normal': pathname === link.href,
                  }
                )}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })}
        </>
      );
}