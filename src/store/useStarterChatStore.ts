import { create } from 'zustand';

export type PollQuestion = {
  _id: string;
  question: string;
};

export type InsightSteps = 'agreement' | 'poll';

export type starterChatQuestions = PollQuestion[];

export type PollResult = Record<string, string>;

type State = {
  starterChatQuestions: starterChatQuestions;
  loading: boolean;
  currentQuestionIndex: number;
  starterChatResults: PollResult;
  isStartedChatActivated: boolean;
  currentStarterChatStep: InsightSteps;
};

type ResetConfig = {
  disableTabbar: boolean;
};

type Actions = {
  setStarterChatQuestions: (data: starterChatQuestions) => void;
  setLoadingState: (loading: boolean) => void;
  setQuestionIndex: (index: number) => void;
  setStarterChatStep: (step: InsightSteps) => void;
  setIsStarterChatActivated: (isStartedChatActivated: boolean) => void;
  addUserAnswer: (key: string, data: string) => void;
  resetStarterChat: ({ disableTabbar }: ResetConfig) => void;
};

const initialValues: State = {
  currentStarterChatStep: 'agreement',
  starterChatQuestions: [],
  isStartedChatActivated: false,
  loading: false,
  currentQuestionIndex: 0,
  starterChatResults: {},
};

type PollState = State & Actions;

export const useStarterChatStore = create<PollState>()(set => ({
  ...initialValues,
  setLoadingState: loading => set({ loading }),
  setIsStarterChatActivated: isStartedChatActivated =>
    set({ isStartedChatActivated }),
  setStarterChatStep: step => set({ currentStarterChatStep: step }),
  setStarterChatQuestions: data => set({ starterChatQuestions: data }),
  setQuestionIndex: index => set({ currentQuestionIndex: index }),
  addUserAnswer: (key, data) =>
    set(state => ({
      starterChatResults: {
        ...state.starterChatResults,
        [key]: data,
      },
    })),
  resetStarterChat: ({ disableTabbar }: ResetConfig) => {
    const { loading, currentQuestionIndex, starterChatResults } = initialValues;
    set({
      loading,
      currentQuestionIndex,
      starterChatResults,
      isStartedChatActivated: !disableTabbar,
    });
  },
}));
