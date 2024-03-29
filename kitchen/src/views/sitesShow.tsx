'use client';

import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import Link from 'next/link';

type SitesShowProps = {
  site: Types.Site;
  latestRecipes: Types.RecipePreview[];
};

const SitesShow: Next.NextPage<SitesShowProps> = (props) => {
  return (
    <div>
      <Ui.Text.Title as="h1" className="sr-only">
        {props.site.title}
      </Ui.Text.Title>
      <section className="mt-2">
        <Ui.Slider.SouffléSection heading="Featured recipes">
          {props.site.featuredRecipes.map((recipe) => {
            return (
              <div className="max-w-[80vw] w-[36rem]" key={recipe._id}>
                <Ui.Cards.Recipe recipe={recipe} />
              </div>
            );
          })}
        </Ui.Slider.SouffléSection>
      </section>
      <section className="mt-32">
        <Ui.Slider.SouffléSection heading="Recipe collections">
          {props.site.collections.map((collection) => {
            return (
              <div className="max-w-[80vw] w-[28rem]" key={collection._id}>
                <Ui.Cards.Collection collection={collection} />
              </div>
            );
          })}
        </Ui.Slider.SouffléSection>
      </section>
      <section className="mt-32">
        <Ui.Container>
          <Ui.Grid>
            <div className="col-span-7">
              <div className="mb-3">
                {props.site.aboutHeading ? (
                  <Ui.Text.Title as="h2">
                    <Ui.Richtext.Inherited content={props.site.aboutHeading} />
                  </Ui.Text.Title>
                ) : (
                  <Ui.Text.Title as="h2">About</Ui.Text.Title>
                )}
              </div>
              <Ui.Richtext.Styled content={props.site.about} />

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
            <div className="col-span-5">
              {props.site.featuredImage && (
                <div className="relative aspect-square">
                  <Ui.Media.Image image={props.site.featuredImage} alt="Profile picture" />
                </div>
              )}
            </div>
          </Ui.Grid>
        </Ui.Container>
      </section>
      {props.site.productLinks && (
        <section className="mt-32">
          <Ui.Slider.SouffléSection heading="My favorite products">
            {props.site.productLinks.map((productLink) => {
              return (
                <div className="max-w-[80vw] w-[28rem]" key={productLink._key}>
                  <Ui.Cards.ProductLink productLink={productLink} />
                </div>
              );
            })}
          </Ui.Slider.SouffléSection>
        </section>
      )}
      <section className="mt-32">
        <Ui.Container>
          <div className="mb-3 flex justify-between items-center">
            <Ui.Text.Title as="h2">Latest recipes</Ui.Text.Title>
            <Link href="/recipes">
              <Ui.Text.Highlight bold className="underline hover:opacity-60 transition-opacity">
                View all
              </Ui.Text.Highlight>
            </Link>
          </div>
          <Ui.Grid>
            {props.latestRecipes.map((recipe) => {
              return (
                <div key={recipe._id} className="col-span-12 sm:col-span-6 md:col-span-4">
                  <Ui.Cards.Recipe recipe={recipe} />
                </div>
              );
            })}
          </Ui.Grid>
        </Ui.Container>
      </section>
    </div>
  );
};

export default SitesShow;
