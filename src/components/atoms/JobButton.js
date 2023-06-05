import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Icon from '@ant-design/icons';
import i18n from '../../common/localize/i18n';

function JobButton(props) {
  // eslint-disable-next-line react/prop-types
  const { img, text } = props;
  return (
    <Button
      type="dashed"
      shape="round"
      icon={<Icon component={img} />}
      size="middle"
      style={{ margin: 5 }}
    >
      {i18n.t(text)}
    </Button>
  );
}
JobButton.PropTypes = {
  img: PropTypes.elementType,
  text: PropTypes.string,
};

JobButton.defaultProps = {
  img: null,
  text: '',
};

export default JobButton;
