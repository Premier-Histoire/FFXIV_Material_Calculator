import { Layout, Menu, Typography } from 'antd';
import { ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './App.scss';
import CrafterRecipes from './components/pages/CrafterRecipes';
import CraftingList from './components/molecules/CraftingList';
import MaterialList from './components/organisms/MaterialList';
import { useDispatch, useSelector } from 'react-redux';
import garlandsActions from './state/ducks/garlands/actions';
import i18n from './common/localize/i18n';
import Setting from './components/pages/Setting';

function App() {
  const { Footer, Sider, Content } = Layout;

  const { craftingList, resultList } = useSelector(
    (state) => state.garlandsReducer
  );
  const { isLoading } = useSelector((state) => state.commonReducer);

  const dispatch = useDispatch();
  const [leftSideBarCollapsed, setLeftSideBarCollapsed] = useState(false);
  const onLeftSideBarCollapse = () => {
    const isCollapsed = leftSideBarCollapsed;
    setLeftSideBarCollapsed(!isCollapsed);
  };

  const [rightSideBarCollapsed, setRightSideBarCollapsed] = useState(false);
  const onRightSideBarCollapse = () => {
    const isCollapsed = rightSideBarCollapsed;
    setRightSideBarCollapsed(!isCollapsed);
  };

  const [pageKey, setPageKey] = useState('Crafter Recipes');

  const [materialListOpen, setMaterialListOpen] = useState(false);

  const calButtonStyle = {
    backgroundColor: '#005580',
    color: '#ffffff',
    position: 'absolute',
    height: 60,
    fontSize: 20,
    lineHeight: '60px',
    bottom: 44,
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MaterialList
        onOpen={materialListOpen}
        setOnOpen={setMaterialListOpen}
        materialListData={resultList}
        isLoading={isLoading}
      />
      <Sider
        collapsible
        theme="light"
        collapsed={leftSideBarCollapsed}
        onCollapse={onLeftSideBarCollapse}
        className="sidebar-area"
      >
        <div className="title-area">
          {!leftSideBarCollapsed ? (
            <Typography style={{ color: 'white' }}>
              FFXIV_Materials_Calculator
            </Typography>
          ) : (
              <Typography style={{ color: 'white' }}>FMC</Typography>
          )}
          {!leftSideBarCollapsed && (
            <Typography style={{ color: 'white' }}>プルミエ商会</Typography>
          )}
        </div>

        <Menu
          theme="light"
          defaultSelectedKeys={pageKey}
          mode="inline"
          onClick={(item) => setPageKey(item.key)}
          className="sidebar-area"
        >
          <Menu.Item
            key="Crafter Recipes"
            icon={<ProfileOutlined />}
            className="sidebar-left-menu-area"
          >
            {i18n.t('left-sidemenu-1')}
          </Menu.Item>
          {/* <Menu.Item key="Leveling Jobs" icon={<AppstoreAddOutlined />}>
            Leveling Jobs
          </Menu.Item> */}
          <Menu.Item
            key="Setting"
            icon={<SettingOutlined />}
            className="sidebar-left-menu-area"
          >
            {i18n.t('left-sidemenu-setting')}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          {pageKey === 'Crafter Recipes' && <CrafterRecipes />}
          {pageKey === 'Setting' && <Setting />}
        </Content>
        <Footer style={{ textAlign: 'center', fontSize: 12 }}>
          FINAL FANTASY is a registered trademark of Square Enix Holdings Co.
          Ltd. <br />
          FINAL FANTASY XIV © 2010 - 2023 SQUARE ENIX CO., LTD. All Rights
          Reserved.
        </Footer>
      </Layout>
      <Sider
        width={500}
        collapsible
        theme="light"
        collapsedWidth={200}
        reverseArrow
        collapsed={rightSideBarCollapsed}
        onCollapse={onRightSideBarCollapse}
        style={{
          overflowX: 'hidden',
          height: '100vh',
          transition: 'all 0.2s',
        }}
        className="sidebar-area"
      >
        <div className="title-area">
          <Typography style={{ fontSize: 18, color: '#ffffff' }}>
            {i18n.t('right-sidemenu-title')}
          </Typography>
        </div>
        <div className="crafting-list-area">
          <Menu
            theme="light"
            selectable={false}
            mode="inline"
            style={{ overflow: 'hidden' }}
            className="sidebar-area"
          >
            <CraftingList
              collapsed={rightSideBarCollapsed}
              onEAChange={(index, value) =>
                dispatch(garlandsActions.setCraftingEA(index, value))
              }
              onDeleteButton={(index) =>
                dispatch(garlandsActions.deleteCraftingList(index))
              }
            />
            <Menu.Item
              key="Calculate"
              onClick={() => {
                dispatch(garlandsActions.calculateCraftingList(craftingList));
                setMaterialListOpen(true);
              }}
              style={calButtonStyle}
            >
              {!rightSideBarCollapsed && i18n.t('right-sidemenu-calbutton')}
              {rightSideBarCollapsed &&
                i18n.t('right-sidemenu-calbutton-collasped')}
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
    </Layout>
  );
}

export default App;

