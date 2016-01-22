/**
 * @file esui-react Tabs Tab
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('melon-classname').create('TabItem');
const Tappable = require('../Tappable');

function TabItem(props) {

    const {selected, label, ...others} = props;

    return (
        <Tappable {...others} className={cx(props).addStates({selected}).build()}>
            {label}
        </Tappable>
    );

}

module.exports = TabItem;
