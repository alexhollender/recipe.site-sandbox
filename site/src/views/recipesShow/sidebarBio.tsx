import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import Link from 'next/link';

const SidebarBio = ({ site }: { site: Types.Site }) => {
  return (
    <div className="border border-outline p-6 rounded-lg text-center Bio">
      {site.featuredImage && (
        <div className="px-2">
          <div className="rounded-full aspect-square relative overflow-hidden">
            <Ui.Media.Image
              image={site.featuredImage}
              alt={`Profile picture`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      {site.aboutShort && (
        <div className="mt-6 text-subdued">
          <Ui.Text.Body>
            <Ui.Richtext.Inherited content={site.aboutShort} />
          </Ui.Text.Body>
        </div>
      )}

      <div className="mt-6 text-text">
        <Link href="/about">
          <Ui.Text.Label bold className="hover:opacity-60 transition-opacity">
            Learn More
          </Ui.Text.Label>
        </Link>
      </div>

      {site.socialMediaLinks.length > 0 && (
        <div className="mt-6 justify-center flex gap-x-6">
          <Ui.SocialMediaLinks socialMediaLinks={site.socialMediaLinks} />
        </div>
      )}
    </div>
  );
};

export default SidebarBio;
