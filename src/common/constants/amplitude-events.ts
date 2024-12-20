// FORMAT:
//export const AMPLITUDE_EVENTS = {
// <SCREEN/FEATURE NAME>: {
//   VIEWED_SCREEN: [ViewedScreen] <ScreenName>,
//   VIEWED_MODAL_OR_SCREEN_INSIDE_ROOT_SCREEN: 'Viewed <Modal/ScreenName>',
//   PRESSED_<BUTTON_NAME>: '[<ScreenName/InsideScreenOrModalName>] Pressed <ButtonName>'
//   SWIPED_<CAROUSEL_NAME>: '[<ScreenName/InsideScreenOrModalName>] CarouselSwipe: ' + <index>
// }
import { ChatCategories } from '@store/useCategorizedChatFlowStore';

export const AMPLITUDE_EVENTS = {
  HOME_SCREEN: {
    PRESSED_MICHAEL_CHAT_CTA: '[HomeScreen] Pressed on Michael Chat CTA',
  },
  LOGIN_SCREEN: {
    VIEWED_SCREEN: '[ViewedScreen] Login Screen',
    LOGIN_SUCCESS: '[LoginScreen] Login Success',
  },
  REGISTER_SCREEN: {
    VIEWED_SCREEN: '[ViewedScreen] Register Screen',
    REGISTER_SUCCESS: '[LoginScreen] Register Success',
  },
  CHATS: {
    VIEWED_SCREEN: '[ViewedScreen] Chats Tab',
    SELECTED_CHAT_CATEGORY: (category: ChatCategories | 'free_chat') =>
      `[ChatCategoriesListScreen] Selected Chat Category: ${category}`,
    PRESSED_CONTINUE_LAST_CONVERSATION_CTA:
      '[ChatCategoriesListScreen] Pressed Continue Last Conversation CTA',
    PRESSED_FREE_CHAT_BUTTON:
      '[ChatCategoriesListScreen] Pressed Free Chat Button',
    PRESSED_NEW_CHAT: (source: 'category' | 'chat') =>
      `[ChatsTab] Pressed New Chat on ${source} screen`,
    PRESSED_EXISTING_CHAT: (source: 'category' | 'chat') =>
      `[ChatsTab] Pressed Existing Chat on ${source} screen`,
    OPENED_CHAT_DRAWER: '[ChatsTab] Opened Chat Drawer',
    PRESSED_BACK_BUTTON: (source: 'category' | 'chat') =>
      `[ChatsTab] Pressed Back Button on ${source} screen`,
    PRESSED_SEND_MESSAGE: '[ChatsTab] Pressed Send Message',
    VIEWED_EARLY_LEAVE_MODAL: '[ChatsTab] Viewed Early Leave Modal',
    VIEWED_DELETE_CHAT_MODAL: '[ChatsTab] Viewed Delete Chat Modal',
    CONFIRMED_LEAVE_CHAT: '[ChatsTab] Confirmed Leave Chat',
    PRESSED_DELETE_CHAT_BUTTON: (source: 'category' | 'chat') =>
      `[ChatsTab] Pressed Delete Chat Button on ${source} screen`,
    CONFIRMED_CHAT_DELETION: (source: 'category' | 'chat') =>
      `[ChatsTab] Confirmed Chat Deletion on ${source} screen`,
  },
  STARTER_CHAT: {
    VIEWED_STARTER_CHAT_AGREEMENT_SCREEN:
      '[ViewedScreen] Starter Chat Agreement Screen',
    MARKED_STARTER_CHAT_AGREEMENT_CHECKBOX:
      '[StarterChatAgreementScreen] Marked Agreement Checkbox',
    PRESSED_NOT_NOW_BUTTON:
      '[StarterChatAgreementScreen] Pressed Not Now Button',
    PRESSED_START_STARTER_CHAT_FLOW:
      '[StarterChatAgreementScreen] Pressed Start Button',
    VIEWED_STARTER_CHAT_SCREEN: '[ViewedScreen] Starter Chat',
    ANSWERED_STARTER_CHAT_QUESTION: '[StarterChat] Answered question',
    SUBMIT_STARTER_CHAT_ANSWERS: '[StarterChat] Submit Answers',
  },
  SUBSCRIPTION_SCREEN: {
    VIEWED_SUBSCRIPTION_SCREEN: '[ViewedScreen] Subscription Screen',
  },
};
