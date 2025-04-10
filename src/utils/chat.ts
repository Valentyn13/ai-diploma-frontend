import image from '@common/assets/images';
import {
  ChatCategories,
  ChatCategoriesEnum,
} from '@store/useCategorizedChatFlowStore';
import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'types/Chat';

import { generateUUID } from './generateUUID';

export const SYSTEM_USER = {
  _id: 'DR_MICHAEL',
  name: 'Майкл',
  avatar: image('michael_chat'),
} as const;

const getBasicMessage = (name: string) => {
  return `Привіт, ${name}, я Майкл 🤗

Я радий, що ви вирішили поділитися зі мною своїми думками та почуттями. Я тут, щоб вислухати, підтримати та допомогти вам відкрити нові грані себе.

Щоб у нас була змістовна та корисна розмова:
• Діліться зі мною детальною інформацією - чим більше я знаю, тим краще я можу зрозуміти та допомогти.
• ⁠Поясніть контекст - це дозволить мені дати вам доречні та точні відповіді.
• Не соромтеся запитувати чи уточнювати – це допоможе нам поглибити розмову.

Пам’ятайте, я тут, щоб підтримати та порадити, але я не замінюю професійну допомогу.
У нас є 50 повідомлень для кожної розмови, але ми завжди можемо продовжити нову розмову!`;
};

const SHORT_FIRST_MESSAGE = {
  [ChatCategoriesEnum.BAD_HABITS]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Привіт, ${name}, я Майкл 🤗

Ради1 бачити вас тут знову!

Хочете продовжити працювати над зміною звичок, чи, можливо, є щось нове, чим ви хотіли б поділитися?

Я тут для того щоб допогти.`,
      },
    ];
  },
  [ChatCategoriesEnum.NEGATIVE]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Привіт, ${name}, я Майкл 🤗

Я радий, що ви повернулися!

Ви можете продовжити говорити про свої моделі мислення або поділитися зі мною чимось новим, що вас зацікавило.

Що б ви хотіли, щоб ми сьогодні дослідили разом?`,
      },
    ];
  },
  [ChatCategoriesEnum.ANXIETY]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Привіт, ${name}, я Майкл 🤗

Радий знову вас бачити!

Ви можете продовжити говорити про свою тривогу або поділитися новими почуттями, які виникли.

Чим я можу вам допомогти сьогодні?`,
      },
    ];
  },
  [ChatCategoriesEnum.SELF_DEV]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Привіт, ${name}, я Майкл 🤗

Як добре, що ви повернулися!

Ми можемо продовжити роботу над вашим особистим розвитком або поговорити про щось нове, важливе для вас.

Що у вас на сьогодні в планах?`,
      },
    ];
  },
};

const FIRST_MESSAGE = {
  [ChatCategoriesEnum.BAD_HABITS]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Привіт, ${name}, я Майкл 🤗

Я радий, що ви вирішили попрацювати над зміною звичок, які вам заважають. Разом ми дослідимо причини цих звичок і розробимо ефективні стратегії заміни їх більш здоровими звичками.`,
      },
      {
        _id: 'intro_system_2',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Щоб почати, поділіться зі мною:

1. Які конкретні звички ви хотіли б змінити і як вони впливають на ваше життя?

2. Як ви думаєте, які причини змушують вас повторювати ці звички?

3. Яким чином ви намагалися боротися зі звичками в минулому, і що спрацювало, а що не спрацювало?,`,
      },
    ];
  },
  [ChatCategoriesEnum.ANXIETY]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Привіт, ${name}, я Майкл 🤗

Я розумію, скільки мужності потрібно, щоб впоратися з тривогою, і я тут, щоб підтримати вас. Разом ми дослідимо причини вашої тривоги та розробимо ефективні стратегії для зменшення тривоги та покращення якості життя.`,
      },
      {
        _id: 'intro_system_2',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Щоб почати, поділіться зі мною:

1.⁠ У яких ситуаціях ви відчуваєте тривогу?

2. Які фізичні та емоційні симптоми ви відчуваєте, коли виникає тривога?

3. Що допомагає вам розслабитися, коли ви перебуваєте на піку тривоги?',`,
      },
    ];
  },
  [ChatCategoriesEnum.NEGATIVE]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Привіт, ${name}, я Майкл 🤗

Я ціную вашу готовність працювати над зміною негативних моделей мислення. Разом ми навчимося розпізнавати шкідливі  думки та замінювати їх більш корисними та позитивними.`,
      },
      {
        _id: 'intro_system_2',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Щоб почати, будь ласка, скажіть мені:

        1. Які негативні думки найчастіше виникають у вас у голові та в яких ситуаціях вони виникають?
        
        2. Як ці негативні думки впливають на ваші почуття та поведінку?`,
      },
    ];
  },
  [ChatCategoriesEnum.SELF_DEV]: (name: string) => {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Привіт, ${name}, я Майкл 🤗

Вітаємо з рішенням вивести свій особистий розвиток на новий рівень! Я радий супроводжувати вас у вашій подорожі, щоб реалізувати свій потенціал і досягти ваших особистих цілей.`,
      },
      {
        _id: 'intro_system_2',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: `Щоб почати, поділіться зі мною:

        1. Які ваші три найважливіші цілі зараз у вашому особистому чи професійному житті?
        
        2. Які основні проблеми чи перешкоди заважають вам досягти своїх цілей?`,
      },
    ];
  },
};

const getFirstMsgArr = (
  name: string,
  category: ChatCategoriesEnum,
  chatsLength: number,
) => {
  if (chatsLength) {
    return SHORT_FIRST_MESSAGE[category](name);
  }
  return FIRST_MESSAGE[category](name);
};

export const getFirstMsgs = (
  name: string,
  gender: 'M' | 'F',
  category: ChatCategories,
  chatsLength: number,
): IMessage[] => {
  if (!category) {
    return [
      {
        _id: 'intro_system',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: getBasicMessage(name),
      },
      {
        _id: 'intro_system_2',
        user: SYSTEM_USER,
        createdAt: new Date(),
        text: 'Тож скажи мені, чим ви сьогодні зайняті? Я тут,для того щоб допомогти✨',
      },
    ];
  }
  return getFirstMsgArr(name, category, chatsLength);
};

export const mapMessageToIMessage = (message: Message): IMessage => {
  return {
    _id: message._id || generateUUID(),
    text: message.content,
    createdAt: new Date(message.timestamp),
    user: message.role === 'user' ? { _id: 'USER' } : SYSTEM_USER,
  };
};

export const mapIMessageToMessage = (message: IMessage): Message => {
  return {
    id: message._id as string,
    content: message.text,
    timestamp: message.createdAt.toString(),
    role: message.user._id === 'USER' ? 'user' : 'assistant',
  };
};
