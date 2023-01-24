import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: 'v1',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_PROJECT_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (scorce) => builder.image(scorce);