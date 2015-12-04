define('melon/createInputComponent', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Validator'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var defaultValidator = require('./Validator');
    var PropTypes = React.PropTypes;
    var InputComponent = React.createClass({
        displayName: 'InputComponent',
        propTypes: {
            name: PropTypes.string,
            pointer: PropTypes.string,
            validate: PropTypes.func,
            renderErrorMessage: PropTypes.func,
            onChange: PropTypes.func,
            validator: PropTypes.shape({ validate: PropTypes.func.isRequired })
        },
        getDefaultProps: function () {
            return { defaultValue: '' };
        },
        getInitialState: function () {
            var name = this.props.name;
            this.validator = this.props.validator || this.context.validator || defaultValidator;
            var pointer = this.context.pointer;
            this.pointer = name != null && pointer ? '' + this.context.pointer + name : null;
            var _props = this.props;
            var value = _props.value;
            var defaultValue = _props.defaultValue;
            return { value: value != null ? value : defaultValue };
        },
        contextTypes: {
            pointer: PropTypes.string,
            validator: PropTypes.shape({ validate: PropTypes.func.isRequired }),
            attachForm: PropTypes.func,
            detachForm: PropTypes.func
        },
        childContextTypes: { pointer: PropTypes.string },
        getChildContext: function () {
            var pointer = this.pointer;
            return { pointer: pointer ? pointer + '/' : null };
        },
        componentDidMount: function () {
            var attachForm = this.context.attachForm;
            if (attachForm) {
                attachForm(this);
            }
        },
        componentWillUnmount: function () {
            var detachForm = this.context.detachForm;
            if (detachForm) {
                detachForm(this);
            }
        },
        componentWillReceiveProps: function (nextProps) {
            var customValidity = nextProps.customValidity;
            var value = nextProps.value;
            if (value !== this.getValue() || customValidity !== this.props.customValidity) {
                this.setState({
                    value: value,
                    validity: customValidity ? this.validator.createCustomValidity(customValidity) : this.checkValidity(value)
                });
            }
        },
        validate: function (value) {
            var validity = this.checkValidity(value);
            this.setState({ validity: validity });
            return validity;
        },
        checkValidity: function (value) {
            return this.validator.validate(value, this);
        },
        onChange: function (e) {
            var onChange = this.props.onChange;
            if (onChange) {
                onChange(e);
                return;
            }
            var value = e.value;
            if (value === this.state.value) {
                return;
            }
            var customValidity = this.props.customValidity;
            this.setState({
                value: value,
                validity: customValidity ? this.validator.createCustomValidity(customValidity) : this.checkValidity(value)
            });
        },
        getValue: function () {
            var child = this.child;
            if (child) {
                if (typeof child.getValue === 'function') {
                    return child.getValue();
                }
                if (child.props.value) {
                    return child.props.value;
                }
            }
            return this.state.value;
        },
        render: function () {
            var _this = this;
            var props = this.props;
            var onChange = this.onChange;
            var pointer = this.pointer;
            var children = props.children;
            var _props$validate = props.validate;
            var validate = _props$validate === undefined ? this.validate : _props$validate;
            var _props$states = props.states;
            var states = _props$states === undefined ? {} : _props$states;
            var restProps = babelHelpers.objectWithoutProperties(props, [
                'children',
                'validate',
                'states'
            ]);
            var _state = this.state;
            var value = _state.value;
            var validity = _state.validity;
            if (value === '') {
                states.empty = true;
            }
            var input = React.cloneElement(React.Children.only(children), babelHelpers._extends({}, restProps, {
                pointer: pointer,
                validity: validity,
                validate: validate,
                value: value,
                states: states,
                onChange: onChange,
                ref: function (child) {
                    if (child) {
                        _this.child = child;
                    }
                }
            }));
            return input;
        }
    });
    exports.isValidInputElement = function (element) {
        return React.isValidElement(element) && element.props.type === InputComponent;
    };
    exports.create = function (Component) {
        var InputComponentWrapper = React.createClass({
            displayName: Component.displayName + 'InputWrapper',
            render: function () {
                var props = this.props;
                var children = props.children;
                return React.createElement(InputComponent, props, React.createElement(Component, props, children));
            }
        });
        InputComponentWrapper.defaultProps = Component.defaultProps;
        InputComponentWrapper.propTypes = Component.propTypes;
        return InputComponentWrapper;
    };
});