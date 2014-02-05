/**
 * class <%= params.projectClass %>
 */
function <%= params.projectClass %>() {
}

<%= params.projectClass %>.prototype.do = function (cb) {
  cb();
};

module.exports = <%= params.projectClass %>;
