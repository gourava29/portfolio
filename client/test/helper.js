import { expect } from 'chai';
import { sinon, spy, stub, assert} from 'sinon';
import { mount, render, shallow } from 'enzyme';

global.expect = expect;
global.stub = stub;
global.spy = spy;
global.assert = assert;

global.mount = mount;
global.render = render;
global.shallow = shallow;

global.fetchStubSuccess = (respData)  => {
    return new Promise((resolve, reject) => resolve({ json: () => new Promise((resolve, reject) => resolve(respData)) }));
}

global.fetchStubFailure = (respError)  => {
    return new Promise((resolve, reject) => reject(respError));
}

global.fetchStubJSONFailer = ()  => {
    return new Promise((resolve, reject) => resolve({ json: () => new Promise((resolve, reject) => reject()) }));
}