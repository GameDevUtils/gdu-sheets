
export default class ObjectUtil {

    static isDeepEqual = (a:any, b:any) : boolean => {
        if(('string|number|boolean'.includes(typeof a)) && a === b) return true;

        if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
            const a_sorted = a.slice().sort();
            const b_sorted = b.slice().sort();

            const includesEach = a_sorted.every((item, index) => {
                return ObjectUtil.isDeepEqual(item, b_sorted[index]);
            }) && b_sorted.every((item, index) => {
                return ObjectUtil.isDeepEqual(item, a_sorted[index]);
            });

            let matched = true;
            for(let index = 0; index < a_sorted.length; index++) {
                if(!ObjectUtil.isDeepEqual(a_sorted[index], b_sorted[index])) {
                    matched = false;
                    break;
                }
            }
            return includesEach && matched;
        }

        if(typeof a === 'object' && typeof b === 'object') {
            const a_keys = Object.keys(a).slice().sort();
            const b_keys = Object.keys(b).slice().sort();

            let result = false;
            if(a_keys.length !== b_keys.length) return false;
            result = a_keys.every((item) => {
                return ObjectUtil.isDeepEqual(a[item], b[item]);
            });
            return result;
        }

        return !!a && (a === b);
    }

}