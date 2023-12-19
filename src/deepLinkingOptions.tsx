import dynamicLinks from '@react-native-firebase/dynamic-links';
import { utils } from '@react-native-firebase/app';
import { Linking } from 'react-native';

const prefixes = ['firebase.auth.poc://', 'https://firauthpoc.page.link'];

export const deepLinkingOptions = {
  prefixes,
  async getInitialURL() {
    // First, you would need to get the initial URL from your third-party integration
    // The exact usage depend on the third-party SDK you use
    // For example, to get the initial URL for Firebase Dynamic Links:
    const { isAvailable } = utils().playServicesAvailability;

    if (isAvailable) {
      const initialLink = await dynamicLinks().getInitialLink();

      if (initialLink) {
        return initialLink.url;
      }
    }

    // As a fallback, you may want to do the default deep link handling
    const url = await Linking.getInitialURL();

    return url!;
  },

  // Custom function to subscribe to incoming links
  subscribe(listener: (deepLink: string) => void) {
    const handler = ({ url }: { url: string }) => {
      listener(url);
    };

    const unsubscribeFirebase = dynamicLinks().onLink(handler);

    const linkingSubscription = Linking.addEventListener('url', handler);

    return () => {
      unsubscribeFirebase();
      linkingSubscription.remove();
    };
  },

  config: {
    screens: {
      EmailVerification: { path: 'email-verification' },
    },
  },
};
