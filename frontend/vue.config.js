module.exports = {
    assetsDir: "static",
    filenameHashing: false, // Leave that to Django
    devServer: {
        // Write files to disk in dev mode, so Django can serve the assets
        writeToDisk: true,
        disableHostCheck: true
    },
}
