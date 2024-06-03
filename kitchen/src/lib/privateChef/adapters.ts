import * as PortableText from '@portabletext/types';
import * as SanityClient from '@sanity/client';
import * as Tiptap from '@tiptap/react';
import * as Types from '@/lib/types';
import * as Uuid from 'uuid';
import * as Nanoid from 'nanoid';

export const AppRecipe = {
  serializeForUpload: (transaction: SanityClient.Transaction, recipe: Types.Recipe) => {
    const updatedIngredientUsages: Types.Sanity.IngredientUsageForUpload[] = [];

    const updatedRecipe: Types.Sanity.RecipeForUpload = {
      _id: recipe.id,
      _createdAt: recipe._createdAt,
      site: {
        _type: 'reference',
        _ref: recipe.siteId,
      },
      _type: 'recipe',
      title: recipe.title || '',
      slug: recipe.slug
        ? {
            _type: 'slug',
            current: recipe.slug,
          }
        : undefined,
      categories: recipe.categoryIds.map((categoryId) => ({
        _type: 'reference',
        _ref: categoryId,
      })),
      cuisines: recipe.cuisineIds.map((cuisineId) => ({
        _type: 'reference',
        _ref: cuisineId,
      })),
      tags: recipe.tagIds.map((tagId) => ({
        _type: 'reference',
        _ref: tagId,
      })),
      methods: recipe.methodIds.map((methodId) => ({
        _type: 'reference',
        _ref: methodId,
      })),
      meals: recipe.mealIds.map((mealId) => ({
        _type: 'reference',
        _ref: mealId,
      })),
      diets: recipe.dietIds.map((dietId) => ({
        _type: 'reference',
        _ref: dietId,
      })),
      description: recipe.description
        ? TiptapContent.toPortableText(recipe.description)
        : undefined,
      createdAt: recipe.createdAt || undefined,
      featuredMedia: recipe.featuredMedia
        ? SanityMedia.serializeForUpload(recipe.featuredMedia)
        : undefined,
      difficultyLevel: recipe.difficultyLevel || undefined,
      prepTimeMinutes: recipe.prepTimeMinutes || undefined,
      cookTimeMinutes: recipe.cookTimeMinutes || undefined,
      totalTimeMinutes: recipe.totalTimeMinutes || undefined,
      keywords: recipe.keywords || [],
      yieldServings: recipe.yieldServings || undefined,
      servingDescription: recipe.servingDescription || undefined,
      storyExcerpt: recipe.storyExcerpt
        ? TiptapContent.toPortableText(recipe.storyExcerpt)
        : undefined,
      storyMore: recipe.storyMore ? TiptapContent.toPortableText(recipe.storyMore) : undefined,
      note: recipe.note ? TiptapContent.toPortableText(recipe.note) : undefined,
      timing: recipe.timing || undefined,
      legacyRecipeData: recipe.legacyRecipeData || undefined,
      ingredientUsageGroups: (recipe.ingredientUsageGroups || []).map((ingredientUsageGroup) => {
        return {
          _type: 'ingredientUsageGroup',
          key: ingredientUsageGroup.key,
          title: ingredientUsageGroup.title || undefined,
          note: ingredientUsageGroup.note
            ? TiptapContent.toPortableText(ingredientUsageGroup.note)
            : undefined,
          ingredientUsages: ingredientUsageGroup.ingredientUsages.map((ingredientUsage) => {
            const updatedIngredientUsage: Types.Sanity.IngredientUsageForUpload = {
              _type: 'ingredientUsage',
              _id: ingredientUsage.id,
              _createdAt: ingredientUsage._createdAt,
              ingredient: ingredientUsage.ingredientId
                ? {
                    _type: 'reference',
                    _ref: ingredientUsage.ingredientId,
                  }
                : undefined,
              ingredientTitleOverride: ingredientUsage.ingredientTitleOverride || undefined,
              link: ingredientUsage.link || undefined,
              quantityMin: ingredientUsage.quantityMin || undefined,
              quantityMax: ingredientUsage.quantityMax || undefined,
              unit: ingredientUsage.unitId
                ? {
                    _type: 'reference',
                    _ref: ingredientUsage.unitId,
                  }
                : undefined,
              preparation: ingredientUsage.preparationId
                ? {
                    _type: 'reference',
                    _ref: ingredientUsage.preparationId,
                  }
                : undefined,
              preperationModifier: ingredientUsage.preperationModifier || undefined,
              note: ingredientUsage.note
                ? TiptapContent.toPortableText(ingredientUsage.note)
                : undefined,
            };

            updatedIngredientUsages.push(updatedIngredientUsage);

            return {
              _type: 'reference',
              _ref: updatedIngredientUsage._id,
            };
          }),
        };
      }),
      instructionGroups: (recipe.instructionGroups || []).map((instructionGroup) => ({
        _type: 'instructionGroup',
        _key: instructionGroup.key,
        title: instructionGroup.title || undefined,
        instructions: instructionGroup.instructions.map((instruction) => ({
          _type: 'instruction',
          key: instruction.key,
          content: instruction.content
            ? TiptapContent.toPortableText(instruction.content)
            : undefined,
          timerMinutes: instruction.timerMinutes || undefined,
          note: instruction.note ? TiptapContent.toPortableText(instruction.note) : undefined,
          media: (instruction.media || []).map(SanityMedia.serializeForUpload),
        })),
      })),
    };

    const withReferences = updatedIngredientUsages.reduce((tx, t) => {
      return tx.createOrReplace(t);
    }, transaction);

    const withDocument = withReferences.createOrReplace(updatedRecipe);

    return withDocument;
  },
};

export const SanityRecipe = {
  toAppRecipe: (sanityRecipe: Types.Sanity.Recipe): Types.Recipe => {
    return {
      id: sanityRecipe._id,
      siteId: sanityRecipe.site._id,
      isPublished: sanityRecipe.isPublished,
      publishedId: sanityRecipe.publishedId,
      _createdAt: sanityRecipe._createdAt,
      _updatedAt: sanityRecipe._updatedAt,
      title: sanityRecipe.title,
      slug: sanityRecipe.slug,
      description: PortableTextContent.toTiptap(sanityRecipe.description || []),
      featuredMedia: sanityRecipe.featuredMedia,
      media: sanityRecipe.media || [],
      storyExcerpt: PortableTextContent.toTiptap(sanityRecipe.storyExcerpt || []),
      storyMore: PortableTextContent.toTiptap(sanityRecipe.storyMore || []),
      createdAt: sanityRecipe.createdAt,
      categoryIds: sanityRecipe.categories
        ? sanityRecipe.categories.map((category) => category._id)
        : [],
      cuisineIds: sanityRecipe.cuisines ? sanityRecipe.cuisines.map((cuisine) => cuisine._id) : [],
      tagIds: sanityRecipe.tags ? sanityRecipe.tags.map((tag) => tag._id) : [],
      dietIds: sanityRecipe.diets ? sanityRecipe.diets.map((diet) => diet._id) : [],
      mealIds: sanityRecipe.meals ? sanityRecipe.meals.map((meal) => meal._id) : [],
      methodIds: sanityRecipe.methods ? sanityRecipe.methods.map((method) => method._id) : [],
      prepTimeMinutes: sanityRecipe.prepTimeMinutes,
      cookTimeMinutes: sanityRecipe.cookTimeMinutes,
      totalTimeMinutes: sanityRecipe.totalTimeMinutes,
      timing: sanityRecipe.timing,
      yieldServings: sanityRecipe.yieldServings,
      servingDescription: sanityRecipe.servingDescription,
      difficultyLevel: sanityRecipe.difficultyLevel,
      keywords: sanityRecipe.keywords,
      note: sanityRecipe.note ? PortableTextContent.toTiptap(sanityRecipe.note) : null,
      legacyRecipeData: sanityRecipe.legacyRecipeData,
      ingredientUsageGroups: (sanityRecipe.ingredientUsageGroups || []).map(
        (ingredientUsageGroup) => {
          return {
            key: ingredientUsageGroup._key,
            title: ingredientUsageGroup.title,
            note: ingredientUsageGroup.note
              ? PortableTextContent.toTiptap(ingredientUsageGroup.note)
              : null,
            ingredientUsages: ingredientUsageGroup.ingredientUsages.map((ingredientUsage) => {
              return {
                id: ingredientUsage._id,
                _createdAt: ingredientUsage._createdAt,
                ingredientId: ingredientUsage.ingredient?._id ?? null,
                ingredientTitleOverride: ingredientUsage.ingredientTitleOverride,
                link: ingredientUsage.link,
                quantityMin: ingredientUsage.quantityMin,
                quantityMax: ingredientUsage.quantityMax,
                unitId: ingredientUsage.unit?._id ?? null,
                preparationId: ingredientUsage.preparation?._id ?? null,
                preperationModifier: ingredientUsage.preperationModifier,
                note: ingredientUsage.note
                  ? PortableTextContent.toTiptap(ingredientUsage.note || [])
                  : null,
              };
            }),
          };
        },
      ),
      instructionGroups: (sanityRecipe.instructionGroups || []).map((instructionGroup) => {
        return {
          key: instructionGroup._key,
          title: instructionGroup.title,
          instructions: instructionGroup.instructions.map((instruction) => {
            return {
              key: instruction._key,
              content: PortableTextContent.toTiptap(instruction.content || []),
              timerMinutes: instruction.timerMinutes,
              note: PortableTextContent.toTiptap(instruction.note || []),
              media: instruction.media || [],
            };
          }),
        };
      }),
    };
  },

  duplicateForUpload: (
    transaction: SanityClient.Transaction,
    recipe: Types.Sanity.Recipe,
    newParams: {
      recipeId: string;
      siteId: string;
    },
  ) => {
    const ingredientUsagesForUpload: Types.Sanity.IngredientUsageForUpload[] = [];

    const oldToNewInstructionGroupIds: Record<string, string> = {};

    const newRecipeForUpload: Types.Sanity.RecipeForUpload = {
      _id: newParams.recipeId,
      _createdAt: recipe._createdAt,
      createdAt: recipe.createdAt || undefined,
      site: {
        _type: 'reference',
        _ref: newParams.siteId,
      },
      _type: 'recipe',
      title: recipe.title || '',
      slug: recipe.slug
        ? {
            _type: 'slug',
            current: recipe.slug,
          }
        : undefined,
      categories: (recipe.categories || []).map((category) => ({
        _type: 'reference',
        _ref: category._id,
      })),
      cuisines: (recipe.cuisines || []).map((cuisine) => ({
        _type: 'reference',
        _ref: cuisine._id,
      })),
      tags: (recipe.tags || []).map((tag) => ({
        _type: 'reference',
        _ref: tag._id,
      })),
      methods: (recipe.methods || []).map((method) => ({
        _type: 'reference',
        _ref: method._id,
      })),
      meals: (recipe.meals || []).map((meal) => ({
        _type: 'reference',
        _ref: meal._id,
      })),
      diets: (recipe.diets || []).map((diet) => ({
        _type: 'reference',
        _ref: diet._id,
      })),
      description: recipe.description || [],
      featuredMedia: recipe.featuredMedia
        ? SanityMedia.serializeForUpload(recipe.featuredMedia)
        : undefined,
      difficultyLevel: recipe.difficultyLevel || undefined,
      prepTimeMinutes: recipe.prepTimeMinutes || undefined,
      cookTimeMinutes: recipe.cookTimeMinutes || undefined,
      totalTimeMinutes: recipe.totalTimeMinutes || undefined,
      keywords: recipe.keywords || [],
      yieldServings: recipe.yieldServings || undefined,
      servingDescription: recipe.servingDescription || undefined,
      storyExcerpt: recipe.storyExcerpt || undefined,
      storyMore: recipe.storyMore || undefined,
      note: recipe.note || undefined,
      timing: recipe.timing || undefined,
      legacyRecipeData: recipe.legacyRecipeData || undefined,
      ingredientUsageGroups: (recipe.ingredientUsageGroups || []).map((ingredientUsageGroup) => {
        return {
          _type: 'ingredientUsageGroup',
          title: ingredientUsageGroup.title || undefined,
          note: ingredientUsageGroup.note || undefined,
          ingredientUsages: ingredientUsageGroup.ingredientUsages.map((ingredientUsage) => {
            const newId = Uuid.v4();
            oldToNewInstructionGroupIds[ingredientUsage._id] = newId;

            const newIngredientUsage: Types.Sanity.IngredientUsageForUpload = {
              _type: 'ingredientUsage',
              _id: newId,
              _createdAt: ingredientUsage._createdAt,
              ingredient: ingredientUsage.ingredient
                ? {
                    _type: 'reference',
                    _ref: ingredientUsage.ingredient._id,
                  }
                : undefined,
              ingredientTitleOverride: ingredientUsage.ingredientTitleOverride || undefined,
              link: ingredientUsage.link || undefined,
              quantityMin: ingredientUsage.quantityMin || undefined,
              quantityMax: ingredientUsage.quantityMax || undefined,
              unit: ingredientUsage.unit
                ? {
                    _type: 'reference',
                    _ref: ingredientUsage.unit._id,
                  }
                : undefined,
              preparation: ingredientUsage.preparation
                ? {
                    _type: 'reference',
                    _ref: ingredientUsage.preparation._id,
                  }
                : undefined,
              preperationModifier: ingredientUsage.preperationModifier || undefined,
              note: ingredientUsage.note || undefined,
            };

            ingredientUsagesForUpload.push(newIngredientUsage);

            return {
              _type: 'reference',
              _ref: newIngredientUsage._id,
            };
          }),
        };
      }),
      instructionGroups: (recipe.instructionGroups || []).map((instructionGroup) => ({
        _type: 'instructionGroup',
        title: instructionGroup.title || undefined,
        instructions: instructionGroup.instructions.map((instruction) => ({
          _type: 'instruction',
          content: instruction.content
            ? instruction.content.map((block) => {
                return {
                  ...block,
                  markDefs: block.markDefs
                    ? block.markDefs.map((markDef) => {
                        if (markDef._type === 'ingredientUsageReference') {
                          return {
                            ...markDef,
                            ingredientUsage: {
                              _type: 'reference',
                              _ref: oldToNewInstructionGroupIds[
                                (markDef.ingredientUsage as any)._id
                              ],
                            },
                          };
                        }
                        if (markDef._type === 'measurement') {
                          return {
                            ...markDef,
                            unit: {
                              _type: 'reference',
                              _ref: (markDef.unit as any)._id,
                            },
                          };
                        }
                        return markDef;
                      })
                    : undefined,
                };
              })
            : undefined,
          timerMinutes: instruction.timerMinutes || undefined,
          note: instruction.note || undefined,
          media: (instruction.media || []).map(SanityMedia.serializeForUpload),
        })),
      })),
    };

    const withReferences = ingredientUsagesForUpload.reduce((tx, t) => {
      return tx.create(t);
    }, transaction);

    const withDocument = withReferences.create(newRecipeForUpload);

    return withDocument;
  },
};

export const SanityMedia = {
  serializeForUpload: (media: Types.Sanity.Media): Types.Sanity.MediaForUpload => {
    return {
      _type: 'media' as const,
      image: media.image
        ? {
            _type: 'image' as const,
            asset: {
              _type: 'reference' as const,
              _ref: media.image.asset._id,
            },
          }
        : undefined,
      video: media.video
        ? {
            _type: 'file' as const,
            asset: {
              _type: 'reference' as const,
              _ref: media.video.asset._id,
            },
          }
        : undefined,
    };
  },
};

const TiptapMarksToPortableTextMarks: Record<string, string> = {
  bold: 'strong',
  italic: 'em',
};

const PortableTextMarksToTiptapMarks: Record<string, string> = {
  strong: 'bold',
  em: 'italic',
};

const TiptapListTypesToPortableTextListTypes: Record<string, string> = {
  bulletList: 'bullet',
};

const PortableTextListTypesToTiptapListTypes: Record<string, string> = {
  bullet: 'bulletList',
};

export const PortableTextContent = {
  toTiptap: (portableText: PortableText.PortableTextBlock[]): Types.Richtext => {
    function convertNode(
      node: PortableText.PortableTextBlock | PortableText.PortableTextSpan,
      markDefs: PortableText.PortableTextMarkDefinition[] = [],
    ): Tiptap.JSONContent | null {
      switch (node._type) {
        case 'block':
          if (!!node.style && node.style.startsWith('h')) {
            return {
              type: 'heading',
              attrs: {
                level: parseInt(node.style.slice(1)),
              },
              content: node.children
                ? (node.children
                    // @ts-ignore
                    .map((child) => convertNode(child, node.markDefs))
                    .filter((n) => n) as Tiptap.JSONContent[])
                : [],
            };
          }

          /*
          TODO: Get list items working. This is a bit tricky because the
          Portable Text spec doesn't nest their lists.
          */

          if (node.listItem) {
            const { listItem, ...rest } = node;
            return {
              type: PortableTextListTypesToTiptapListTypes[listItem],
              content: [
                {
                  type: 'listItem',
                  content: [convertNode(rest, node.markDefs)].filter(
                    (n) => n,
                  ) as Tiptap.JSONContent[],
                },
              ],
            };
          }

          return {
            type: 'paragraph',
            content: node.children
              ? (node.children
                  // @ts-ignore
                  .map((child) => convertNode(child, node.markDefs))
                  .filter((n) => n) as Tiptap.JSONContent[])
              : [],
          };

        case 'span':
          /*
          Tiptip doesn't allow for empty text nodes, so we need to filter
          them out.
          */
          if ('text' in node && node.text === '') return null;

          return {
            type: 'text',
            // @ts-ignore
            text: node.text,
            // @ts-ignore
            marks: node.marks?.map((mark) => {
              const markDef = markDefs.find((def) => def._key === mark);
              if (markDef && markDef._type === 'link') {
                return {
                  type: 'link',
                  attrs: {
                    href: markDef.href,
                    target: markDef.openInNewTab ? '_blank' : '_self',
                    rel: markDef.openInNewTab ? 'noopener noreferrer nofollow' : '',
                  },
                };
              }
              return {
                type: PortableTextMarksToTiptapMarks[mark],
              };
            }),
          };

        default:
          console.warn(`Unsupported node type: ${node._type}`);
          return null;
      }
    }

    return {
      type: 'doc',
      content: portableText
        .map((block) => convertNode(block))
        .filter((n) => n) as Tiptap.JSONContent[],
    };
  },
};

export const TiptapContent = {
  toPortableText: (tiptapContent: Types.Richtext): PortableText.PortableTextBlock[] => {
    function convertNode(
      node: Tiptap.JSONContent,
    ): PortableText.PortableTextBlock | PortableText.PortableTextSpan | null {
      const convertContent = (
        content: Tiptap.JSONContent[] | undefined,
      ): PortableText.PortableTextSpan[] => {
        if (!content || content.length === 0) {
          return [
            {
              _type: 'span',
              text: '',
              marks: [],
              _key: Nanoid.nanoid(),
            },
          ];
        }
        return content.map(convertNode).filter((n) => n) as PortableText.PortableTextSpan[];
      };

      switch (node.type) {
        case 'text':
          return {
            _type: 'span',
            text: node.text || '',
            marks: node.marks?.map((mark) => TiptapMarksToPortableTextMarks[mark.type]),
            _key: Nanoid.nanoid(),
          };

        case 'paragraph':
          return {
            _type: 'block',
            style: 'normal',
            children: convertContent(node.content),
            markDefs: [],
            _key: Nanoid.nanoid(),
          };

        case 'heading':
          return {
            _type: 'block',
            // @ts-ignore
            style: `h${node.attrs.level}`,
            children: convertContent(node.content),
            // TODO: Make markdefs work
            markDefs: [],
            _key: Nanoid.nanoid(),
          };

        default:
          console.warn(`Unsupported node type: ${node.type}`);
          return null;
      }
    }

    return tiptapContent.content
      .map(convertNode)
      .filter((n) => n) as PortableText.PortableTextBlock[];
  },
};
