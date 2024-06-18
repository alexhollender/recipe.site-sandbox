'use client';

import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

import Link from 'next/link';

type SitesShowProps = {
  site: Types.Site;
  latestRecipes: Types.RecipePreview[];
};

const SitesShow: Next.NextPage<SitesShowProps> = (props) => {
  return (
    <div className="mb-24 HomePage">
      <Ui.Text.Title as="h1" className="sr-only">
        {props.site.title}
      </Ui.Text.Title>
      {/* Featured recipes */}
      {props.site.featuredRecipes && (
        <section>
          <Ui.Slider.Slider
            items={props.site.featuredRecipes.length}
            controlType="header"
            heading="Featured recipes"
            wrapperClasses="max-w-[120rem] mx-auto"
          >
            {() =>
              props.site.featuredRecipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="flex-shrink-0 snap-start ps-4 slider-item-container"
                >
                  <div className="slider-item-inner">
                    <div className="max-w-[80vw] w-[30rem]">
                      <Ui.Cards.Recipe recipe={recipe} />
                    </div>
                  </div>
                </div>
              ))
            }
          </Ui.Slider.Slider>
        </section>
      )}
      {/* Collections */}
      {props.site.collections && (
        <section className="mt-14 md:mt-28 first-of-type:mt-2 Collections">
          <Ui.Slider.Slider
            items={props.site.collections.length}
            controlType="header"
            heading="Recipe collections"
            wrapperClasses="max-w-[120rem] mx-auto"
          >
            {() =>
              props.site.collections.map((collection) => (
                <div
                  key={collection._id}
                  className="flex-shrink-0 snap-start ps-4 slider-item-container"
                >
                  <div className="slider-item-inner">
                    <div className="max-w-[80vw] w-[24rem]">
                      <Ui.Cards.Collection collection={collection} />
                    </div>
                  </div>
                </div>
              ))
            }
          </Ui.Slider.Slider>
        </section>
      )}
      {/* Show Conor */}
      {/* About 1 */}
      {props.site.featuredRecipes && <AboutSection site={props.site} />}
      {/* Products */}
      {props.site.productLinks && (
        <section className="mt-16 md:mt-28 first-of-type:mt-2 Products">
          <Ui.Slider.Slider
            items={props.site.featuredRecipes.length}
            controlType="header"
            heading="My favorite products"
            wrapperClasses="max-w-[120rem] mx-auto"
          >
            {() =>
              props.site.productLinks.map((productLink) => (
                <div
                  key={productLink._key}
                  className="flex-shrink-0 snap-start ps-4 slider-item-container"
                >
                  <div className="slider-item-inner">
                    <div className="max-w-[80vw] w-[22rem]">
                      <Ui.Cards.ProductLink productLink={productLink} />
                    </div>
                  </div>
                </div>
              ))
            }
          </Ui.Slider.Slider>
        </section>
      )}
      {/* Latest recipes */}
      <section className="mt-20 md:mt-28 first-of-type:mt-2 LatestRecipes">
        <Ui.Container>
          <div className="mb-3 flex justify-between items-center text-text">
            <Ui.Text.Title as="h2">Latest recipes</Ui.Text.Title>
            <Link href="/recipes">
              <Ui.Text.Label bold className="hover:opacity-60 transition-opacity">
                View all
              </Ui.Text.Label>
            </Link>
          </div>
          <Ui.Grid>
            {props.latestRecipes.map((recipe) => {
              return (
                <div key={recipe._id} className="col-span-12 md:col-span-6 lg:col-span-4">
                  <Ui.Cards.Recipe recipe={recipe} />
                </div>
              );
            })}
          </Ui.Grid>
        </Ui.Container>
      </section>
      {/* About 2 */}
      {!props.site.featuredRecipes && <AboutSection site={props.site} />}
    </div>
  );
};

export default SitesShow;

const AboutSection = ({ site }: { site: Types.Site }) => {
  return (
    <section className="mt-20 md:mt-28 About">
      <Ui.Container>
        <Ui.Grid>
          <div className="col-span-12 md:col-span-6 text-accent">
            <div className="mb-5">
              <Ui.Text.Lead bold as="h2">
                {site.aboutHeading ? (
                  <Ui.Richtext.Inherited content={site.aboutHeading} />
                ) : (
                  `About`
                )}
              </Ui.Text.Lead>
            </div>
            <Ui.Richtext.Styled style="narrative" content={site.about} />

            {site.socialMediaLinks.length > 0 && (
              <div className="mt-6 flex gap-x-6">
                <Ui.SocialMediaLinks socialMediaLinks={site.socialMediaLinks} />
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-start-8 md:col-span-5">
            {site.featuredImage && (
              <div>
                <Ui.Media.Image
                  image={site.featuredImage}
                  alt="Profile picture"
                  className={Utils.cx(['w-full h-auto'])}
                />
              </div>
            )}
          </div>
        </Ui.Grid>
      </Ui.Container>
    </section>
  );
};
