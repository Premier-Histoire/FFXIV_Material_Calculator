/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Typography, Row, Col, Checkbox, Popover } from 'antd';
import i18n from '../../common/localize/i18n';

function MaterialListCheck(props) {
  // eslint-disable-next-line react/prop-types
  const { itemData } = props;

  const lowLevelList = (itemDatas) => {
    const lowLevelMaterialData =
      itemDatas.lowLevelMaterial.length > 0
        ? itemDatas.lowLevelMaterial[0]
        : {};
    return (
      <div>
        {Object.keys(lowLevelMaterialData).length === 0 && (
          <p style={{ textAlign: 'center' }}>
            {i18n.t('material-list-popover-nomaterial')}
          </p>
        )}
        {Object.keys(lowLevelMaterialData).map((itemName, index) => (
          <div
            key={'popover' + index}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {lowLevelMaterialData[itemName].length > 0 && (
              <>
                <Image
                  width={30}
                  preview={false}
                  placeholder={false}
                  src={
                    lowLevelMaterialData[itemName][0].info.icon.includes(
                      'https://xivapi.com'
                    )
                      ? lowLevelMaterialData[itemName][0].info.icon
                      : `https://xivapi.com${lowLevelMaterialData[itemName][0].info.icon}`
                  }
                />
                <p style={{ marginLeft: 20 }}>
                  {itemName} X {lowLevelMaterialData[itemName][0].amount}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };
  return (
    <Row gutter={[16, 7]}>
      {Object.keys(itemData).map((itemName, index) => (
        <>
          <Col span={6}>
            <Popover
              content={lowLevelList(itemData[itemName])}
              title={`${itemData[itemName].info.name} ${i18n.t(
                'material-list-popover-title'
              )}`}
            >
              <div
                key={index}
                style={{
                  display: 'flex',
                  marginBottom: 3,
                  marginLeft: 20,
                  justifyContent: 'space-between',
                }}
              >
                <div key={index + '22'} style={{ display: 'flex' }}>
                  <Image
                    width={30}
                    preview={false}
                    placeholder={false}
                    src={
                      itemData[itemName].info.icon.includes(
                        'https://xivapi.com'
                      )
                        ? itemData[itemName].info.icon
                        : `https://xivapi.com${itemData[itemName].info.icon}`
                    }
                  />

                  <Typography style={{ marginLeft: 5 }}>
                    {itemData[itemName].info.name} X {itemData[itemName].amount}
                  </Typography>
                </div>
                <div>
                  <Checkbox value={itemData[itemName].info.id} />
                </div>
              </div>
            </Popover>
          </Col>
        </>
      ))}
    </Row>
  );
}
MaterialListCheck.propTypes = {
  itemData: PropTypes.object,
};

MaterialListCheck.defaultProps = {
  itemData: {
    test: {
      amount: 0,
      info: {
        name: '',
        icon: '',
        id: '',
      },
    },
  },
};

export default MaterialListCheck;
