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
        <div className="col-span-12 md:col-span-6">
          <div className="mb-3">
            {props.site.aboutHeading ? (
              <Ui.Text.Title bold as="h2">
                <Ui.Richtext.Inherited content={props.site.aboutHeading} />
              </Ui.Text.Title>
            ) : (
              <Ui.Text.Title bold as="h2">
                About
              </Ui.Text.Title>
            )}
          </div>
          <Ui.Richtext.Styled style="narrative" content={props.site.about} />
          {props.site.socialMediaLinks.length > 0 && (
            <div className="mt-6 flex space-x-5">
              {props.site.socialMediaLinks.slice(0, 3).map((socialMediaLink) => {
                return (
                  <div key={socialMediaLink._key} className="w-8">
                    <Ui.SocialMediaLink socialMediaLink={socialMediaLink} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-start-8 md:col-span-5">
          <div className="relative aspect-square">
            <Ui.Media.Image image={props.site.featuredImage} alt="Profile picture" />
          </div>
        </div>
      </Ui.Grid>
    </Ui.Container>
  );
};

export default About;
