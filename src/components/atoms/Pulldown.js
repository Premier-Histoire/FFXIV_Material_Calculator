/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

function Pulldown(props) {
  // eslint-disable-next-line react/prop-types
  const { options, onChange, value } = props;

  const { Option } = Select;
  return (
    <Select
      size="large"
      style={{ width: '100%' }}
      onChange={onChange}
      value={value}
    >
      {options.map((row) => (
        <Option key={row.value} value={row.value}>
          {row.text}
        </Option>
      ))}
    </Select>
  );
}

Pulldown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

Pulldown.defaultProps = {
  onChange: () => {},
  value: '',
};

export default Pulldown;
