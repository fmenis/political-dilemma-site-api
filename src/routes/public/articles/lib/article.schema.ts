import { Static, Type } from "@sinclair/typebox";

export const listArticlesQuerystring = Type.Object(
  {
    limit: Type.Integer({
      // minimum: 0, ##TODO
      description: "##TODO.",
      default: 0,
    }),
    offset: Type.Integer({
      /** minimum: 0, ##TODO */ default: 10,
      description: "##TODO.",
    }),
  },
  { additionalProperties: false }
);
export type ListArticlesQuerystringType = Static<
  typeof listArticlesQuerystring
>;

export const SlistArticles = Type.Object(
  {
    id: Type.String({ format: "uuid", description: "##TODO" }),
    title: Type.String({ minLength: 3, description: "##TODO" }),
  },
  { additionalProperties: false }
);
export type ListArticlesType = Static<typeof SlistArticles>;
