const md = require('markdown-it');

module.exports = eleventyApi => {
    eleventyApi.setDataDeepMerge(true);
    eleventyApi.addPassthroughCopy('src/favicon.ico');
    eleventyApi.addPassthroughCopy('src/static/img');
    eleventyApi.addPlugin(require('@11ty/eleventy-navigation'));
    eleventyApi.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
    eleventyApi.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_alias: 'excerpt',
        excerpt_separator: '<!-- excerpt -->'
    });
    eleventyApi.addFilter('dateString', date => {
        const formatOptions = {
            timeZone: 'UTC',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleString('en-US', formatOptions);
    });
    eleventyApi.addFilter('mdToHTML', content => {
        const contentWithNoReferenceLinks = content.replace(/\s\[(.+)]\s/g, ' $1 ');
        return new md({ html: true }).renderInline(contentWithNoReferenceLinks);
    });
    return {
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            layouts: '_layouts'
        }
    };
};
