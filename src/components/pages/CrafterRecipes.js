import { Row, Col, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  crafterRecipesPullDownOptions,
  crafterRecipesRadioOptions,
} from '../../common/optionList';
import garlandsActions from '../../state/ducks/garlands/actions';
import Pulldown from '../atoms/Pulldown';
import RadioGroup from '../atoms/RadioGroups';
import RecipeTable from '../molecules/RecipeTable';
import i18n from '../../common/localize/i18n';

import './scss/CrafterRecipes.scss';

function CrafterRecipes() {
  const [radioSelect, setRadioSelect] = useState('');
  const [pulldownSelect, setPulldownSelect] = useState('');
  const { craftRecipeList } = useSelector((state) => state.garlandsReducer);

  const dispatch = useDispatch();
  return (
    <div className="crafter-recipes">
      <div className="header-area">
        <Row justify="center" style={{ height: 30, marginBottom: 30 }}>
          <Col span={24} style={{ textAlign: 'center', fontSize: 28 }}>
            <Typography style={{ color: '#999999' }}>
              {i18n.t('crafter-recipes-title')}
            </Typography>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24} style={{ textAlign: 'center', fontSize: 40 }}>
            <RadioGroup
              options={crafterRecipesRadioOptions}
              onChange={(e) => {
                dispatch(
                  garlandsActions.getCraftRecipeList(
                    e.target.value,
                    pulldownSelect
                  )
                );
                setRadioSelect(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col span={3}></Col>
          <Col span={18} style={{ textAlign: 'center', fontSize: 32 }}>
            {radioSelect && (
              <Pulldown
                options={crafterRecipesPullDownOptions}
                onChange={(value) => {
                  dispatch(
                    garlandsActions.getCraftRecipeList(radioSelect, value)
                  );
                  setPulldownSelect(value);
                }}
                value={pulldownSelect}
              />
            )}
          </Col>
          <Col span={3}></Col>
        </Row>
      </div>
      <div className="table-area">
        <Row
          justify="center"
          style={{ height: 'calc(80vh - 220px)', padding: '20px' }}
        >
          <Col span={1}></Col>
          <Col span={22} style={{ textAlign: 'center', fontSize: 32 }}>
            {craftRecipeList.length !== 0 && (
              <RecipeTable
                columns={[
                  { name: 'icon', title: '', width: 60, align: 'center' },
                  {
                    name: 'name',
                    title: 'Name',
                    align: 'left',
                  },
                ]}
                data={craftRecipeList}
                onAddButtonClick={(value) => {
                  dispatch(garlandsActions.addCraftingList(value));
                }}
              />
            )}
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </div>
  );
}

export default CrafterRecipes;
