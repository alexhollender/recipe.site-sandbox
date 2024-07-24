import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import Link from 'next/link';

type SocialMediaLinkProps = {
  socialMediaLink: Types.SocialMediaLink;
};

const IconMap: Record<Types.SocialMediaLink['platform'], React.FC> = {
  discord: Ui.Icons.SocialMedia.Discord,
  email: Ui.Icons.SocialMedia.Email,
  instagram: Ui.Icons.SocialMedia.Instagram,
  pinterest: Ui.Icons.SocialMedia.Pinterest,
  substack: Ui.Icons.SocialMedia.Substack,
  tiktok: Ui.Icons.SocialMedia.Tiktok,
  x: Ui.Icons.SocialMedia.X,
  youtube: Ui.Icons.SocialMedia.Youtube,
};

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ socialMediaLink }) => {
  const Icon = IconMap[socialMediaLink.platform];

  return (
    <Link
      href={socialMediaLink.url}
      target="_blank"
      className="hover:opacity-60 transition-opacity"
    >
      <Icon />
    </Link>
  );
};

type SocialMediaLinkGroupProps = {
  socialMediaLinks: Types.SocialMediaLink[];
};

const SocialMediaLinks: React.FC<SocialMediaLinkGroupProps> = ({ socialMediaLinks }) => {
  return (
    <>
      {socialMediaLinks.slice(0, 3).map((socialMediaLink) => (
        <div key={socialMediaLink._key} className="w-6">
          <SocialMediaLink socialMediaLink={socialMediaLink} />
        </div>
      ))}
    </>
  );
};

export default SocialMediaLinks;
