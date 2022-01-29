const eventBus = {
  on: (event: string, callback: Function) => document.addEventListener(event, (e: any) => callback(e.detail)),
  dispatch: (event: string, data: any) => {
    const customEvent = new CustomEvent(event, { detail: data });
    document.dispatchEvent(customEvent);
  },
  remove: (event: string, callback: Function) => document.removeEventListener(event, (e) => callback(e)),
};

export default eventBus;
