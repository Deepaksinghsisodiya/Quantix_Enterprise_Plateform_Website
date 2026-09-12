'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { DesktopNavItem } from './DesktopNavItem';
import { PRIMARY_LINKS } from '../../config/navConfig';
import { ProductsMegaMenu } from './MegaMenu/ProductsMegaMenu';
import { SolutionsMegaMenu } from './MegaMenu/SolutionsMegaMenu';
import { IntegrationsMegaMenu } from './MegaMenu/IntegrationsMegaMenu';
import { WhyQuantixMegaMenu } from './MegaMenu/WhyQuantixMegaMenu';
import { ResourcesMegaMenu } from './MegaMenu/ResourcesMegaMenu';

interface DesktopNavProps {
  pathname: string;
  openMegaMenu: string | null;
  onSetOpenMegaMenu: (label: string | null) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  pathname,
  openMegaMenu,
  onSetOpenMegaMenu,
}) => {
  return (
    <>
      <ul
        role="menubar"
        aria-label="Primary navigation menu"
        className="hidden space-x-2 lg:flex items-center font-sans"
      >
        {PRIMARY_LINKS.map((link) => (
          <DesktopNavItem
            key={link.label}
            link={link}
            pathname={pathname}
            openMegaMenu={openMegaMenu}
            onMouseEnter={(label) => onSetOpenMegaMenu(label)}
            onMouseLeave={() => onSetOpenMegaMenu(null)}
          />
        ))}
      </ul>

      {/* Render Desktop Mega Menu Dropdowns */}
      <AnimatePresence mode="wait">
        {openMegaMenu === 'Solutions' && (
          <ProductsMegaMenu
            onClose={() => onSetOpenMegaMenu(null)}
            onMouseEnter={() => onSetOpenMegaMenu('Solutions')}
            onMouseLeave={() => onSetOpenMegaMenu(null)}
          />
        )}
        {openMegaMenu === 'Features' && (
          <SolutionsMegaMenu
            onClose={() => onSetOpenMegaMenu(null)}
            onMouseEnter={() => onSetOpenMegaMenu('Features')}
            onMouseLeave={() => onSetOpenMegaMenu(null)}
          />
        )}
        {openMegaMenu === 'Integrations' && (
          <IntegrationsMegaMenu
            onClose={() => onSetOpenMegaMenu(null)}
            onMouseEnter={() => onSetOpenMegaMenu('Integrations')}
            onMouseLeave={() => onSetOpenMegaMenu(null)}
          />
        )}
        {openMegaMenu === 'Why Quantix' && (
          <WhyQuantixMegaMenu
            onClose={() => onSetOpenMegaMenu(null)}
            onMouseEnter={() => onSetOpenMegaMenu('Why Quantix')}
            onMouseLeave={() => onSetOpenMegaMenu(null)}
          />
        )}
        {openMegaMenu === 'Resources' && (
          <ResourcesMegaMenu
            onClose={() => onSetOpenMegaMenu(null)}
            onMouseEnter={() => onSetOpenMegaMenu('Resources')}
            onMouseLeave={() => onSetOpenMegaMenu(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
