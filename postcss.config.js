module.exports = {
    "plugins": {
        "precss": {
            import: {
                path: [
                    'src'
                ],
                extension: '.pcss'
            }
        },
        "postcss-write-svg": {},
        // to edit target browsers: use "browserslist" field in package.json
        "autoprefixer": {},
        "postcss-utilities": {},
        "postcss-aspect-ratio-mini": {},
        "postcss-color-function": {},
        //  px to rem 
        "postcss-adaptive": {
            remUnit: 75,
            autoRem: true
        }
        // we are all in the feature!!!
        //  px to vw\vh
        // "postcss-px-to-viewport": {
        //   viewportWidth: 750,
        //   viewportUnit: "vw",
        //   minPixelValue: 1,
        //   selectorBlackList: ['img']
        // },
        // "postcss-viewport-units": {}
    },
    sourceMap: true
};