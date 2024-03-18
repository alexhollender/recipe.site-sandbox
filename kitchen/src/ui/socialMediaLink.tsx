import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Icons from '@/ui/icons';

import Link from 'next/link';

type SocialMediaLinkProps = {
  socialMediaLink: Types.SocialMediaLink;
};

const IconMap: Record<Types.SocialMediaLink['platform'], React.FC> = {
  instagram: Ui.Icons.SocialMedia.Instagram,
  pinterest: Ui.Icons.SocialMedia.Pinterest,
  x: Ui.Icons.SocialMedia.X,
  youtube: Ui.Icons.SocialMedia.Youtube,
  tiktok: Ui.Icons.SocialMedia.Tiktok,
  discord: Ui.Icons.SocialMedia.Discord,
};

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ socialMediaLink }) => {
  const Icon = IconMap[socialMediaLink.platform];

  return (
    <Link href={socialMediaLink.url}>
      <Icon />
    </Link>
  );
};

export default SocialMediaLink;
