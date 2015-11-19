/**
 * @file esui-react/Select
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var InputComponent = require('./InputComponent');

class Select extends InputComponent {

    static displayName = 'Select';

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        // super.onChange(e);

        let value = this.refs.select.value;

        let {onChange} = this.props;

        onChange && onChange({
            ...e,
            value
        });
    }

    render() {

        let {
            label,
            options,
            renderOptions,
            className,
            ...rest
        } = this.props;

        return (
            <div className={this.getClassName()}>
                <label>{label}</label>
                <select {...rest} onChange={this.onChange} ref="select">
                    {renderOptions()}
                </select>
            </div>
        );

    }

}

module.exports = Select;
