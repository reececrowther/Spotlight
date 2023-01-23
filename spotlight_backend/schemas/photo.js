export default{
    name: 'photo',
    title: 'Photo',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'about',
            title: 'About',
            type: 'string'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
        {
            name: 'userId',
            title: 'UserID',
            type: 'string'
        },
        {
            name: 'postedBy',
            title: 'PostedBy',
            type: 'postedBy'
        },
        {
            name: 'like',
            title: 'Like',
            type: 'array',
            of: [{type: 'like'}]
        },
        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of: [{type: 'comment'}]
        },
    ]
}