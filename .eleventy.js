module.exports = eleventyApi => {
    eleventyApi.setDataDeepMerge(true);
    eleventyApi.addPassthroughCopy('src/favicon.ico');
    eleventyApi.addPassthroughCopy('src/static/img');
    eleventyApi.addPlugin(require('@11ty/eleventy-navigation'));
    eleventyApi.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
    eleventyApi.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_alias: 'post_excerpt',
        excerpt_separator: '<!-- excerpt -->'
    });
    eleventyApi.addFilter('dateString', date => {
        const formatOptions = {
            timeZone: 'UTC',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        return date.toLocaleString('en-US', formatOptions);
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
