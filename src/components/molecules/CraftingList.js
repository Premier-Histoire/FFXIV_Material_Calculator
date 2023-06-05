/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Image, Menu, Typography, InputNumber, Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

function CraftingList(props) {
  const { collapsed, onEAChange, onDeleteButton } = props;
  const { craftingList } = useSelector((state) => state.garlandsReducer);

  const menuStyle = {
    backgroundColor: '#dee8ff',
    color: '#111111',
    margin: 0,
    height: 60,
    alignItems: 'center',
    display: 'flex',
    borderBottom: '1px solid #a9b8d9',
  };

  return (
    <>
      {craftingList.map((row, index) => (
        <Menu.Item key={row.id} title={row.name} style={menuStyle} disabled>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                paddingLeft: collapsed ? 0 : 15,
              }}
            >
              <Image
                width={40}
                preview={false}
                placeholder={false}
                src={row.icon}
              />
              {!collapsed && (
                <Typography style={{ marginLeft: 15, color: '#111111' }}>
                  {row.name}
                </Typography>
              )}
            </div>
            <div
              style={{
                display: 'flex',
              }}
            >
              <InputNumber
                min={1}
                max={99}
                value={row.ea}
                onChange={(value) => onEAChange(index, value)}
                style={{
                  width: 60,
                  height: 32,
                  position: 'relative',
                  margin: 5,
                }}
              />

              <Button
                shape="circle"
                icon={
                  <MinusOutlined style={{ color: '#ffffff', lineHeight: 1 }} />
                }
                size="middle"
                style={{
                  margin: 5,
                  marginLeft: 2,
                  backgroundColor: '#e6342e',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteButton(index);
                }}
              />
            </div>
          </div>
        </Menu.Item>
      ))}
    </>
  );
}

CraftingList.propTypes = {
  collapsed: PropTypes.bool,
  onEAChange: PropTypes.func,
  onDeleteButton: PropTypes.func,
};

CraftingList.defaultProps = {
  collapsed: false,
  onEAChange: () => {},
  onDeleteButton: () => {},
};

export default CraftingList;
