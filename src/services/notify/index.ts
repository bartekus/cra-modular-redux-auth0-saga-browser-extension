const NotifyService = {
  basic: ({ title, message }: { title: string; message: string }) =>
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/logo.svg',
      title,
      message,
    }),
};

export default NotifyService;
