// 构造FSA (Flux Standard Action)
export default function createAction(type, payload, error, meta) {
    return {type, payload, error, meta};
}
