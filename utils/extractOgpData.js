
module.exports = function($metaObject) {
    var prop = $metaObject.attr('property');
    var content = $metaObject.attr('content');
    if(!prop || !content) {
        return null;
    }
    return {
        prop: prop,
        content: content
    };
};
