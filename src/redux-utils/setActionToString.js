import forEach from 'lodash/forEach';

const stringSet = new Set();

// 设置函数action的toString方法
export default function setActionToString(prefix, map) {
    forEach(map, (val, key) => {
        const str = prefix + '/' + key;
        if (stringSet.has(str)) {
            throw new Error(`action string (${str}) already used!`);
        }
        stringSet.add(str);
        val.toString = () => str;
    });
}
