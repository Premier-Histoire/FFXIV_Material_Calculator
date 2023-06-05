/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import Icon from '@ant-design/icons';
import './scss/RadioGroup.scss';
import i18n from '../../common/localize/i18n';

function RadioGroup(props) {
  // eslint-disable-next-line react/prop-types
  const { options, onChange } = props;
  return (
    <div className="radio-group" key="radio-group">
      <Radio.Group optionType="button" buttonStyle="solid" onChange={onChange}>
        {options.map((row) => (
          <Radio.Button value={row.value} key={row.value}>
            <Icon component={row.icon} style={{ marginRight: 5 }} />
            {i18n.t(row.text)}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}
RadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    })
  ).isRequired,
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  onChange: () => {},
};

export default RadioGroup;
