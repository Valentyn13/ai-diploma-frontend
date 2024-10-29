import { polyfill } from 'react-native-polyfill-globals/src/fetch';
import 'text-encoding';
import { ReadableStream as ReadableStreamPolyfill } from 'web-streams-polyfill/dist/ponyfill';

polyfill();

// @ts-ignore
globalThis.ReadableStream = ReadableStreamPolyfill;

// Needed for TypeScript:
declare global {
  interface RequestInit {
    /**
     * @description Polyfilled to enable text ReadableStream for React Native:
     * @link https://github.com/facebook/react-native/issues/27741#issuecomment-2362901032
     */
    reactNative?: {
      textStreaming: boolean;
    };
  }
}
