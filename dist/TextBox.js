(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'melon-core/InputComponent', './common/NativeInputComponent', 'melon-core/Validity', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('melon-core/InputComponent'), require('./common/NativeInputComponent'), require('melon-core/Validity'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.InputComponent, global.NativeInputComponent, global.Validity, global.babelHelpers);
        global.TextBox = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _InputComponent, _NativeInputComponent2, _Validity, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent2 = babelHelpers.interopRequireDefault(_InputComponent);

    var _NativeInputComponent3 = babelHelpers.interopRequireDefault(_NativeInputComponent2);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    /**
     * @file TextBox
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TextBox');

    var TextBox = function (_NativeInputComponent) {
        babelHelpers.inherits(TextBox, _NativeInputComponent);

        function TextBox() {
            babelHelpers.classCallCheck(this, TextBox);
            return babelHelpers.possibleConstructorReturn(this, _NativeInputComponent.apply(this, arguments));
        }

        TextBox.prototype.renderLabel = function renderLabel() {
            var label = this.props.label;

            return label ? _react2['default'].createElement(
                'label',
                null,
                label
            ) : null;
        };

        TextBox.prototype.onFocus = function onFocus(e) {
            var onFocus = this.props.onFocus;
            this.input.scrollIntoView();
            onFocus && onFocus(e);
        };

        TextBox.prototype.render = function render() {
            var _this2 = this;

            var unit = this.props.unit;

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, this.props, { className: cx(this.props).addStates(this.getStyleStates()).build() }),
                this.renderLabel(),
                _react2['default'].createElement('input', {
                    value: this.state.value,
                    onChange: this.onChange,
                    onBlur: this.onBlur,
                    onFocus: this.onFocus,
                    autoComplete: 'off',
                    ref: function ref(input) {
                        _this2.input = input;
                    } }),
                unit ? _react2['default'].createElement(
                    'div',
                    { className: cx.getPartClassName('unit') },
                    unit
                ) : null,
                _react2['default'].createElement(_Validity2['default'], { validity: this.state.validity })
            );
        };

        return TextBox;
    }(_NativeInputComponent3['default']);

    exports['default'] = TextBox;


    TextBox.displayName = 'TextBox';

    TextBox.propTypes = babelHelpers['extends']({}, _InputComponent2['default'].propTypes, {
        onFocus: _react.PropTypes.func,
        onBlur: _react.PropTypes.func,
        onChange: _react.PropTypes.func,
        defaultValue: _react.PropTypes.string,
        validateEvents: _react.PropTypes.array
    });

    TextBox.defaultProps = babelHelpers['extends']({}, _InputComponent2['default'].defaultProps, {
        defaultValue: '',
        validateEvents: ['change', 'blur']
    });
});