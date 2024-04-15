import * as Tiptap from '@tiptap/react';
import * as PortableText from '@portabletext/types';
import * as Types from '@/lib/types';

export const sanityRecipeToRecipe = (sanityRecipe: Types.Sanity.Recipe): Types.Recipe => {
  return {
    id: sanityRecipe._id,
    isPublished: sanityRecipe.isPublished,
    publishedId: sanityRecipe.publishedId,
    title: sanityRecipe.title,
    slug: sanityRecipe.slug,
    description: sanityRecipe.description,
    featuredMedia: sanityRecipe.featuredMedia,
    media: sanityRecipe.media || [],
    storyExcerpt: portableTextToTiptap(sanityRecipe.storyExcerpt || []),
    story: portableTextToTiptap(sanityRecipe.storyMore || []),
    createdAt: sanityRecipe.createdAt,
    categoryIds: sanityRecipe.categories
      ? sanityRecipe.categories.map((category) => category._id)
      : [],
    cuisineIds: sanityRecipe.cuisines ? sanityRecipe.cuisines.map((cuisine) => cuisine._id) : [],
    tagIds: sanityRecipe.tags ? sanityRecipe.tags.map((tag) => tag._id) : [],
    dietIds: [],
    mealIds: [],
    methodIds: [],
    prepTimeMinutes: sanityRecipe.prepTimeMinutes,
    cookTimeMinutes: sanityRecipe.cookTimeMinutes,
    totalTimeMinutes: sanityRecipe.totalTimeMinutes,
    timing: sanityRecipe.timing,
    yieldServings: sanityRecipe.yieldServings,
    servingDescription: sanityRecipe.servingDescription,
    difficultyLevel: sanityRecipe.difficultyLevel,
  };
};

export const portableTextToTiptap = (
  portableText: PortableText.PortableTextBlock[],
): Tiptap.JSONContent[] => {
  return [];
};

export const tiptapToPortableText = (
  tiptapContent: Tiptap.JSONContent[],
): PortableText.PortableTextBlock[] => {
  // Recursive function to handle nested structures
  function convertNode(
    node: Tiptap.JSONContent,
  ): PortableText.PortableTextBlock | PortableText.PortableTextSpan | null {
    switch (node.type) {
      case 'text':
        return {
          _type: 'span',
          text: node.text || '',
          marks: node.marks?.map((mark) => mark.type),
        };

      case 'paragraph':
        return {
          _type: 'block',
          style: 'normal',
          children: node.content
            ? (node.content.map(convertNode).filter((n) => n) as PortableText.PortableTextSpan[])
            : [],
        };

      case 'heading':
        return {
          _type: 'block',
          // @ts-ignore
          style: `h${node.attrs.level}`,
          children: node.content
            ? (node.content.map(convertNode).filter((n) => n) as PortableText.PortableTextSpan[])
            : [],
        };

      default:
        console.warn(`Unsupported node type: ${node.type}`);
        return null;
    }
  }

  return tiptapContent.map(convertNode).filter((n) => n) as PortableText.PortableTextBlock[];
};
