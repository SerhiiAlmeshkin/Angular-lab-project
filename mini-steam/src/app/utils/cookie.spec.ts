

import * as cookies from './cookie';
import SpyObj = jasmine.SpyObj;
import Spy = jasmine.Spy;
import {Cookie} from "./cookie";



describe('GamesComponent', () => {
  let docspy: SpyObj<any>
  let cokieSetterSpy: Spy;
  const alanCookie: Cookie = {
    name: 'alan',
    value: 1,
    maxAgeInSec: '1000'
  }
  beforeEach(() => {
    cokieSetterSpy = jasmine.createSpy();
    docspy = spyOnProperty(document, 'cookie', 'set').and.callFake(cokieSetterSpy)

  });
  it('should create cookie according to parameters provided, when createCookie called',  () => {
    cookies.createCookie(alanCookie)

    expect(cokieSetterSpy).toHaveBeenCalledWith('alan=1; max-age=1000')
  });

  it('should get cookie value, when getCookie called',  () => {
    spyOnProperty(document, 'cookie', 'get').and.returnValue('alan=1; max-age=1000')

    expect(cookies.getCookie(alanCookie.name)).toBe(alanCookie.value)
  });
});
