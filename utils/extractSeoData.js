
module.exports = function($metaObject) {
    var name = $metaObject.attr('name');
    var content = $metaObject.attr('content');
    if(!name || !content) {
        return null;
    }
    return {
        prop: name,
        content: content
    };
};
