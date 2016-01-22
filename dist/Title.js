define('melon-wise/lib/Title', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('melon-classname').create('Title');
    function Title(props) {
        var level = props.level;
        var rest = babelHelpers.objectWithoutProperties(props, ['level']);
        return React.createElement('h' + level, babelHelpers._extends({}, rest, { className: cx(props).build() }));
    }
    Title.propsTypes = {
        level: React.PropTypes.oneOf([
            1,
            2,
            3,
            4,
            5,
            6
        ]).isRequired
    };
    Title.defaultProps = { level: 1 };
    module.exports = Title;
});