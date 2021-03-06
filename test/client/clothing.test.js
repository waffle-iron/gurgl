import test from 'ava'
import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import sinon from 'sinon'

import './setup-dom'
import store from '../../client/store'
import { Clothing } from '../../client/components/Clothing'
import { initialState } from './helpful/initialState'

Clothing.prototype.componentWillMount = () => {}

test('Displays all clothing items from store', t => {
  sinon.stub(store, 'dispatch')
  const wrapper = mount(
    <Provider store={store}>
      <Clothing clothing={initialState.clothing}/>
    </Provider>)
  t.is(wrapper.find('.clothingItem').length, 2)
  t.is(wrapper.find('#item-1').length, 1)
})

test('Display correct message if no clothes passed in', t => {
  const wrapper = mount(
    <Provider store={store}>
      <Clothing clothing={[]}/>
    </Provider>
  )
  t.is(wrapper.find('.clothingItem').exists(), false)
  t.is(wrapper.find('.clothingGallery').text(), "There doesn't appear to be anything matching your search, please try again!")
})
