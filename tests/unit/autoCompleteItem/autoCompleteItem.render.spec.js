import * as enzyme from 'enzyme';
import * as enzymeToJson from 'enzyme-to-json';
import React from 'react';
import AutoCompleteItem from '../../../components/autoComplete/autoCompleteItem';

describe('AutoCompleteItem', () => {
  describe('#render()', () => {
    const shallow = enzyme.shallow;
    const shallowToJson = enzymeToJson.shallowToJson;

    it('should render correct autocomplete item', () => {
      const wrapper = shallow(
        <AutoCompleteItem
          value="value"
        >
          item
        </AutoCompleteItem>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render autocomplete item with title mode', () => {
      const wrapper = shallow(
        <AutoCompleteItem
          isTitle
          value="value"
        >
          item
        </AutoCompleteItem>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('should render autocomplete item with active mode', () => {
      const wrapper = shallow(
        <AutoCompleteItem
          isActive
          value="value"
        >
          item
        </AutoCompleteItem>
      );

      expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
  });
});