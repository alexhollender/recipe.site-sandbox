import * as Next from 'next';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import SidebarBio from '@/views/recipesShow/sidebarBio';

type LegacyRecipesShowProps = {
  site: Types.Site;
  legacyRecipe: Types.Recipe;
};

const LegacyRecipesShow: Next.NextPage<LegacyRecipesShowProps> = ({ site, legacyRecipe }) => {
  const mediaArray = [legacyRecipe.featuredMedia, ...(legacyRecipe.media || [])];

  return (
    <div className="RecipePage">
      <Ui.Container className="mb-4">
        <Ui.Grid>
          <div className="col-span-12 lg:col-span-8">
            <header className="space-y-2 mb-3">
              <div className="text-accent flex items-baseline">
                <div className="grow">
                  <Ui.Text.Lead as="h1" bold>
                    {legacyRecipe.title}
                  </Ui.Text.Lead>
                </div>
                <Ui.ShareMenu.ShareMenu />
              </div>
            </header>
            <div className="mb-5 -mx-4 md:-mx-6 lg:mx-0 lg:rounded-lg overflow-hidden RecipePageSliderContainer">
              <Ui.Slider.Slider
                items={mediaArray.length}
                controlType="overlay"
                itemsContainerClasses="aspect-sd"
              >
                {({ onPauseVideo, onPlayVideo, videoPlayStates }) =>
                  mediaArray.map((media, index) => (
                    <div
                      key={media._key}
                      className="aspect-sd min-w-full min-h-full relative snap-start"
                    >
                      <Ui.Media.Media
                        videoOnPause={onPauseVideo}
                        videoOnPlay={onPlayVideo}
                        videoPlayState={videoPlayStates[index]}
                        media={media}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))
                }
              </Ui.Slider.Slider>
            </div>
          </div>
          {!site.hideSidebarBio && (
            <div className="hidden lg:block col-start-10 col-span-3">
              <SidebarBio site={site} />
            </div>
          )}
        </Ui.Grid>
      </Ui.Container>
      {legacyRecipe.legacyRecipeData !== null && (
        <Ui.Container>
          <div
            className="max-w-3xl legacyRecipeHTML"
            dangerouslySetInnerHTML={{ __html: legacyRecipe.legacyRecipeData.content }}
          ></div>
        </Ui.Container>
      )}
    </div>
  );
};

export default LegacyRecipesShow;
