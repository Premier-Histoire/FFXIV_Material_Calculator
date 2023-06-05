import { Row, Col, Typography, Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pulldown from '../atoms/Pulldown';

import i18n from '../../common/localize/i18n';

import './scss/CrafterRecipes.scss';
import commonActions from '../../state/ducks/common/actions';
import { GithubFilled } from '@ant-design/icons';

function Setting() {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.commonReducer);
  return (
    <div className="crafter-recipes">
      <Row
        justify="center"
        style={{ height: 30, marginBottom: 30, marginTop: 50 }}
      >
        <Col span={1} />
        <Col
          span={9}
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: 18,
          }}
        >
          <Typography>{i18n.t('setting-language')}</Typography>
        </Col>
        <Col span={12} style={{ textAlign: 'center', fontSize: 28 }}>
          <Pulldown
            options={[
              { value: 'ja', text: '日本語' },
              { value: 'en', text: 'English' },
            ]}
            onChange={(value) => {
              dispatch(commonActions.changeLanguage(value));
            }}
            value={language}
          />
        </Col>
        <Col span={2} />
      </Row>
      <Row
        justify="left"
        style={{ height: 30, marginBottom: 30, marginTop: 50 }}
      >
        <Col span={1} />
        <Col
          span={9}
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: 18,
          }}
        >
          <Typography>{i18n.t('setting-contact')}</Typography>
        </Col>
        <Col span={12} style={{ textAlign: 'left', fontSize: 28 }}>
          <Button
            type="primary"
            icon={<GithubFilled />}
            style={{ marginRight: 20 }}
            onClick={() =>
              window.location.assign(
                'https://github.com/FREEZ2385/ffxiv_crafting_material_total'
              )
            }
          >
            Contact Github
          </Button>
        </Col>
        <Col span={2} />
      </Row>
    </div>
  );
}

export default Setting;
