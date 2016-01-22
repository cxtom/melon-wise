/**
 * @file esui-react/Mask
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('melon-classname').create('Mask');

const {PropTypes} = React;

function Mask(props) {

    const {show} = props;

    return (
        <div {...props} className={cx(props).addStates({show}).build()} />
    );
}

Mask.propTypes = {
    show: PropTypes.bool
};

module.exports = Mask;
