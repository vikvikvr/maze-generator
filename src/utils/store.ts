export function createAction<Payload>(type: string) {
  return function (payload: Payload) {
    return {
      type,
      payload,
    };
  };
}
