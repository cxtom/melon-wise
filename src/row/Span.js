/**
 * @file main
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';

const cx = require('../util/cxBuilder').create('RowSpan');

function RowSpan(props) {

    let {occupy, style, columnNum, ...other} = props;
    let padding = 20 / (columnNum - 1) + '%';
    style = {
        paddingLeft: padding,
        paddingRight: padding,
        width: (occupy / columnNum) * 100 + '%',
        WebkitBoxFlex: occupy,
        WebkitFlex: [occupy, occupy, 'auto'].join(' '),
        ...style
    };

    return (
        <div {...other} className={cx(props).build()} style={style} />
    );
}

RowSpan.propsTypes = {
    occupy: React.PropTypes.number.isRequired
};

RowSpan.defaultProps = {
    occupy: 4
};

export default RowSpan;
