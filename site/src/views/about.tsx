import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

type AboutProps = {
  site: Types.Site;
};

const About: Next.NextPage<AboutProps> = (props) => {
  return (
    <Ui.Container>
      <Ui.Grid>
        <div className="col-span-12 md:col-span-6 text-accent">
          <div className="mb-3">
            {props.site.aboutHeading ? (
              <Ui.Text.Lead bold as="h1">
                <Ui.Richtext.Inherited content={props.site.aboutHeading} />
              </Ui.Text.Lead>
            ) : (
              <Ui.Text.Lead bold as="h1">
                About
              </Ui.Text.Lead>
            )}
          </div>
          <Ui.Richtext.Styled style="narrative" content={props.site.about} />
          {props.site.socialMediaLinks.length > 0 && (
            <div className="mt-6 flex gap-x-6">
              <Ui.SocialMediaLinks socialMediaLinks={props.site.socialMediaLinks} />
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-start-8 md:col-span-5">
          <div className="relative">
            <Ui.Media.Image
              image={props.site.featuredImage}
              alt="Profile picture"
              className={'w-full h-full object-cover block'}
            />
          </div>
        </div>
      </Ui.Grid>
    </Ui.Container>
  );
};

export default About;
