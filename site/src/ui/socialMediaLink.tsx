import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Icons from '@/ui/icons';

import Link from 'next/link';

type SocialMediaLinkProps = {
  socialMediaLink: Types.SocialMediaLink;
};

const IconMap: Record<Types.SocialMediaLink['platform'], React.FC> = {
  discord: Ui.Icons.SocialMedia.Discord,
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
    <Link href={socialMediaLink.url} className="hover:opacity-60 transition-opacity">
      <Icon />
    </Link>
  );
};

export default SocialMediaLink;
