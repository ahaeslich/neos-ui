import {t, Selector} from 'testcafe';
import {ReactSelector} from 'testcafe-react-selectors';

//
// We define all methods as static here so it would be possible to use these classes without `new`
//
export class Page {
    static treeNode = Selector('a[data-neos-integrational-test="tree__item__nodeHeader__itemLabel"]');

    static getTreeNodeButton = (name) => Page.treeNode.withExactText(name).parent('[role="button"]');

    static getToggleChildrenButtonOf = (name) => Page
        .getTreeNodeButton(name)
        .sibling('[data-neos-integrational-test="tree__item__nodeHeader__subTreetoggle"]');

    static async goToPage(pageTitle) {
        await t.click(this.treeNode.withText(pageTitle));
        await this.waitForIframeLoading(t);
    }

    static async getReduxState(selector) {
        const reduxState = await ReactSelector('Provider').getReact(({props}) => {
            return props.store.getState();
        });
        return selector(reduxState);
    }

    static async waitForIframeLoading() {
        await t.expect(ReactSelector('Provider').getReact(({props}) => {
            const reduxState = props.store.getState();
            return !reduxState.ui.contentCanvas.isLoading;
        })).ok('Loading stopped');
    }
}

export class DimensionSwitcher {
    static dimensionSwitcher = ReactSelector('DimensionSwitcher');

    static dimensionSwitcherFirstDimensionSelector = ReactSelector('DimensionSwitcher SelectBox');

    static dimensionSwitcherFirstDimensionSelectorWithShallowDropDownContents = ReactSelector('DimensionSwitcher SelectBox ContextDropDownContents');

    static async switchLanguageDimension(name) {
        await t
            .click(this.dimensionSwitcher)
            .click(this.dimensionSwitcherFirstDimensionSelector)
            .click(this.dimensionSwitcherFirstDimensionSelectorWithShallowDropDownContents.find('li').withText(name));
    }

    static async switchSingleDimension(name) {
        await t
            .click(this.dimensionSwitcher)
            .click(ReactSelector('DimensionSelectorOption').withProps('option', {label: name}));
    }
}

export class PublishDropDown {
    static publishDropdown = ReactSelector('PublishDropDown ContextDropDownHeader');

    static publishDropdownDiscardAll = ReactSelector('PublishDropDown ContextDropDownContents').find('button').withText('Discard all');

    static async discardAll() {
        await t.click(this.publishDropdown)

        const publishDropdownDiscardAllExists = await Selector(this.publishDropdownDiscardAll).exists;
        if (publishDropdownDiscardAllExists) {
            await t.click(this.publishDropdownDiscardAll);
        }

        const confirmButtonExists = await Selector('#neos-DiscardDialog-Confirm').exists;
        if (confirmButtonExists) {
            await t.click(Selector('#neos-DiscardDialog-Confirm'));
        }
        await Page.waitForIframeLoading();
    }
}

export class Inspector {
    static async getInspectorEditor(propertyName) {
        return ReactSelector('InspectorEditorEnvelope').withProps('id', propertyName);
    }
}
