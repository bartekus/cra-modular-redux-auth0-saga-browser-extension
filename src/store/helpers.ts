export function createAction(type: string, payload?: any) {
  return typeof payload === 'undefined' ? { type } : { type, payload };
}

export function createErrorAction(type: string, error: any) {
  return { type, error };
}

export function createErrorActionWithPayload(type: string, payload: any, error: any) {
  return { type, payload, error };
}
