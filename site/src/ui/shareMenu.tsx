'use client';
import * as React from 'react';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

import Link from 'next/link';

export const ShareMenu = () => {
  return (
    <div>
      {/* modal for mobile */}
      <div className="md:hidden">
        <Ui.Modal.Modal
          trigger={
            <div className="w-5 h-5 hover:opacity-60 transition-opacity">
              <Ui.Icons.Share />
            </div>
          }
        >
          <ShareOptions />
        </Ui.Modal.Modal>
      </div>
      {/* popover for desktop */}
      <div className="hidden md:block">
        <Ui.Popover.Popover
          position={'right'}
          trigger={
            <div className="w-5 h-5 hover:opacity-60 transition-opacity">
              <Ui.Icons.Share />
            </div>
          }
        >
          <ShareOptions />
        </Ui.Popover.Popover>
      </div>
    </div>
  );
};

const ShareOptions = () => {
  const [currentUrl, setCurrentUrl] = React.useState<string>('');
  const [linkCopied, setLinkCopied] = React.useState<boolean>(false);

  React.useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  return (
    <ul className="p-6 flex flex-col gap-y-3">
      <li>
        <button
          onClick={handleCopyLink}
          className={Utils.cx([
            'py-1 flex items-center gap-x-2 hover:opacity-60 transition-opacity text-nowrap',
            {
              'pointer-events-none': linkCopied,
            },
          ])}
        >
          <span className="block h-5 w-5" aria-hidden="true">
            <Ui.Icons.Link />
          </span>
          <span>{!linkCopied ? `Copy link` : `Link copied ✓`}</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => window.print()}
          className="py-1 flex items-center gap-x-2 hover:opacity-60 transition-opacity text-nowrap"
        >
          <span className="block h-5 w-5" aria-hidden="true">
            <Ui.Icons.Print />
          </span>
          <span>Print</span>
        </button>
      </li>
      <li>
        <Link
          className="py-1 flex items-center gap-x-2 hover:opacity-60 transition-opacity text-nowrap"
          href={`https://pinterest.com/pin/create/button/?url=${currentUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="block h-5 w-5" aria-hidden="true">
            <Ui.Icons.SocialMedia.Pinterest />
          </span>
          <span>Pin</span>
        </Link>
      </li>
      <li>
        <Link
          className="py-1 flex items-center gap-x-2 hover:opacity-60 transition-opacity text-nowrap"
          href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="block h-5 w-5" aria-hidden="true">
            <Ui.Icons.SocialMedia.Facebook />
          </span>
          <span>Share to Facebook</span>
        </Link>
      </li>
    </ul>
  );
};
