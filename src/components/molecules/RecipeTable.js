/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, Image, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function RecipeTable(props) {
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line no-unused-vars
  const { columns, data, onAddButtonClick } = props;

  const addfilteredcolumns = () => {
    const newFilteredColumns = columns.map((column) => {
      if (column.name === 'icon') {
        return {
          title: column.title,
          dataIndex: column.name,
          key: column.name,
          width: column.width,
          align: column.align,
          // eslint-disable-next-line react/display-name
          render: (icon) => <Image width={40} placeholder={false} src={icon} />,
        };
      }
      return {
        title: column.title,
        dataIndex: column.name,
        key: column.name,
        width: column.width,
        align: column.align,
      };
    });
    newFilteredColumns.push({
      title: '',
      dataIndex: '',
      width: 80,
      key: '',
      // eslint-disable-next-line react/display-name
      render: (data) => (
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="middle"
          style={{ margin: 5 }}
          onClick={(e) => {
            e.stopPropagation();
            onAddButtonClick(data);
          }}
        />
      ),
    });
    return newFilteredColumns;
  };

  const addfilteredDatas = () => {
    const newFilteredDatas = data.map((dat, index) => {
      return { ...dat, key: index };
    });
    return newFilteredDatas;
  };

  return (
    <Table
      columns={addfilteredcolumns()}
      dataSource={addfilteredDatas()}
      size="small"
      pagination={false}
      scroll={{ y: 'calc(80vh - 300px)' }}
    />
  );
}

RecipeTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.array.isRequired,
  onAddButtonClick: PropTypes.func,
};

RecipeTable.defaultProps = {
  onAddButtonClick: () => {},
};

export default RecipeTable;
