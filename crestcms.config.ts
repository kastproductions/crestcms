import { c } from "~/lib/crest";

const schema = c.schema({
  collections: {
    authors: c.model({
      name: c.string(),
      avatar: c.url(),
      posts: c.hasMany("posts"),
    }),
    posts: c.model({
      title: c.string(),
      body: c.markdown(),
      author: c.hasOne("authors"),
    }),
    seo: c.model({
      title: c.string(),
      description: c.string(),
    }),
    hero: c.model({
      title: c.string(),
      subtitle: c.string(),
    }),
  },
  singletons: {
    homePage: c.model({
      seo: c.hasOne("seo"),
      hero: c.hasOne("hero"),
    }),
    postsPage: c.model({
      seo: c.hasOne("seo"),
      hero: c.hasOne("hero"),
      posts: c.hasMany("posts"),
    }),
    aboutPage: c.model({
      seo: c.hasOne("seo"),
      hero: c.hasOne("hero"),
      about: c.html(),
    }),
    settings: c.model({
      websiteUrl: c.url(),
      twitterUrl: c.url(),
      instagramUrl: c.url(),
    }),
  },
});

export default schema;
