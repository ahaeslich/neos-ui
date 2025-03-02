import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import mergeClassNames from 'classnames';
import style from './style.module.css';

import {FlashMessages} from '@neos-project/neos-ui-error';

const App = ({globalRegistry, menu, isFullScreen, leftSidebarIsHidden, rightSidebarIsHidden}) => {
    const containerRegistry = globalRegistry.get('containers');

    const Modals = containerRegistry.get('Modals');
    const PrimaryToolbar = containerRegistry.get('PrimaryToolbar');
    const SecondaryToolbar = containerRegistry.get('SecondaryToolbar');
    const Drawer = containerRegistry.get('Drawer');
    const LeftSideBar = containerRegistry.get('LeftSideBar');
    const ContentCanvas = containerRegistry.get('ContentCanvas');
    const RightSideBar = containerRegistry.get('RightSideBar');
    const LoadingIndicator = containerRegistry.get('SecondaryToolbar/LoadingIndicator');

    const classNames = mergeClassNames({
        [style.app]: true,
        [style['app--isFullScreen']]: isFullScreen,
        [style['app--leftSidebarIsHidden']]: leftSidebarIsHidden,
        [style['app--rightSidebarIsHidden']]: rightSidebarIsHidden
    });

    return (
        <div className={classNames} id="neos-application">
            <div id="dialog"/>
            <Modals/>
            <FlashMessages/>
            <LoadingIndicator/>
            <PrimaryToolbar/>
            <SecondaryToolbar/>
            <ContentCanvas/>
            <Drawer menuData={menu}/>
            <LeftSideBar/>
            <RightSideBar/>
        </div>
    );
};
App.propTypes = {
    globalRegistry: PropTypes.object.isRequired,
    menu: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string,
            label: PropTypes.string.isRequired,
            uri: PropTypes.string.isRequired,
            target: PropTypes.string,

            children: PropTypes.arrayOf(
                PropTypes.shape({
                    icon: PropTypes.string,
                    label: PropTypes.string.isRequired,
                    uri: PropTypes.string,
                    target: PropTypes.string,
                    isActive: PropTypes.bool.isRequired,
                    skipI18n: PropTypes.bool.isRequired
                })
            )
        })
    ).isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    leftSidebarIsHidden: PropTypes.bool.isRequired,
    rightSidebarIsHidden: PropTypes.bool.isRequired
};

export default connect(state => ({
    isFullScreen: state?.ui?.fullScreen?.isFullScreen,
    leftSidebarIsHidden: state?.ui?.leftSideBar?.isHidden,
    rightSidebarIsHidden: state?.ui?.rightSideBar?.isHidden
}))(App);
