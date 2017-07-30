import { expect } from 'chai';
import { sinon, spy, stub} from 'sinon';
import { mount, render, shallow } from 'enzyme';

global.expect = expect;
global.stub = stub;
global.spy = spy;

global.mount = mount;
global.render = render;
global.shallow = shallow;