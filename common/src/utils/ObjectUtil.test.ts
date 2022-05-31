import {ObjectUtil} from "./ObjectUtil";

describe("ObjectUtil", () => {

    describe("isDeepEqual", () => {

        test("compares numbers", () => {
            expect(ObjectUtil.isDeepEqual(1,1)).toBe(true);
            expect(ObjectUtil.isDeepEqual(1,2)).toBe(false);
            expect(ObjectUtil.isDeepEqual(1,'a')).toBe(false);
            expect(ObjectUtil.isDeepEqual(1, {hhg: 42})).toBe(false);
            expect(ObjectUtil.isDeepEqual(1, [1,2,3])).toBe(false);
        });

        test("compares strings", () => {
            expect(ObjectUtil.isDeepEqual('1','1')).toBe(true);
            expect(ObjectUtil.isDeepEqual('1','2')).toBe(false);
            expect(ObjectUtil.isDeepEqual('1',1)).toBe(false);
            expect(ObjectUtil.isDeepEqual('1','a')).toBe(false);
            expect(ObjectUtil.isDeepEqual('1', {hhg: 42})).toBe(false);
            expect(ObjectUtil.isDeepEqual('1', [1,2,3])).toBe(false);
        });

        test("compares dates", () => {
            const a1 = Date.parse('2/2/1972');
            const a2 = Date.parse('02/02/1972');
            const b = Date.parse('04/28/1971');

            expect(ObjectUtil.isDeepEqual(a1,a2)).toBe(true);
            expect(ObjectUtil.isDeepEqual(a1,b)).toBe(false);
        });

        test("compares arrays", () => {
            expect(ObjectUtil.isDeepEqual([1,2,'a'],[1,2,'a'])).toBe(true);
            expect(ObjectUtil.isDeepEqual([1,2,'a'],[2,'a',1])).toBe(true);
            expect(ObjectUtil.isDeepEqual([12, {hhg: 42}, {a:1, z: {b:2, c:3}}], [12, {hhg: 42}, {a:1, z: {b:2, c:3}}])).toBe(true);
            expect(ObjectUtil.isDeepEqual([1,2,'a'],[1,2,'b'])).toBe(false);
            expect(ObjectUtil.isDeepEqual([1,2,'a'],[1,2])).toBe(false);
            expect(ObjectUtil.isDeepEqual([1,2,'a'],1)).toBe(false);
            expect(ObjectUtil.isDeepEqual([1,2,'a'],'a')).toBe(false);
            expect(ObjectUtil.isDeepEqual([1,2,'a'], {hhg: 42})).toBe(false);
            expect(ObjectUtil.isDeepEqual([1,2,'a'], [1,2,3])).toBe(false);
        });

        test("compares objects", () => {
            expect(ObjectUtil.isDeepEqual({a:1, b:2, c:'a'},{a:1, b:2, c:'a'})).toBe(true);
            expect(ObjectUtil.isDeepEqual({a:1, b:2, c:'a'},{a:1, c:'a', b:2})).toBe(true);
            expect(ObjectUtil.isDeepEqual({a:1, b:2, c:{x:'x', y:'y', z:'z'}},{a:1, b:2, c:{x:'x', y:'y', z:'z'}})).toBe(true);
            expect(ObjectUtil.isDeepEqual({a:1, b:2, c:{x:'x', y:'y', z:'z'}},{a:1, b:2, c:{x:'x', y:'m', z:'z'}})).toBe(false);
            expect(ObjectUtil.isDeepEqual({a:1, b:2, c:'a'},{a:1, b:2, c:'b'})).toBe(false);
            expect(ObjectUtil.isDeepEqual({a:1, b:2, c:'a'},[1,2,'a'])).toBe(false);
            expect(ObjectUtil.isDeepEqual({a:1, b:2, c:'a'},{a:1, b:2})).toBe(false);
            expect(ObjectUtil.isDeepEqual({a:1, b:2, c:'a'},42)).toBe(false);
            expect(ObjectUtil.isDeepEqual({a:1, b:2, c:'a'},'M')).toBe(false);
        });

    });

});
