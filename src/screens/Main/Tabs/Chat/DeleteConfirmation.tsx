import { AMPLITUDE_EVENTS } from '@common/constants';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import React, { FC, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  type: 'leave' | 'delete';
  onConfirm: () => void;
  onCancel: () => void;
};

const LEAVE_CHAT_TITLE = 'עדיין לא סיימנו את השיחה';
const LEAVE_CHAT_DESCRIPTION = 'בטוח/ה שברצונך לצאת?';
const LEAVE_CHAT_CONFIRM_BUTTON = 'אני רוצה לצאת';
const LEAVE_CHAT_CANCEL_BUTTON = 'המשך שיחה';

const DELETE_CHAT_TITLE = 'מחק צ׳אט';
const DELETE_CHAT_DESCRIPTION = 'האם ברצונך למחוק את השיחה?';
const DELETE_CHAT_CONFIRM_BUTTON = 'כן';
const DELETE_CHAT_CANCEL_BUTTON = 'לא';

const ConfirmationModal: FC<Props> = ({
  type,
  visible,
  onConfirm,
  onCancel,
}) => {
  const title = type === 'leave' ? LEAVE_CHAT_TITLE : DELETE_CHAT_TITLE;
  const description =
    type === 'leave' ? LEAVE_CHAT_DESCRIPTION : DELETE_CHAT_DESCRIPTION;
  const confirmText =
    type === 'leave' ? LEAVE_CHAT_CONFIRM_BUTTON : DELETE_CHAT_CONFIRM_BUTTON;
  const cancelText =
    type === 'leave' ? LEAVE_CHAT_CANCEL_BUTTON : DELETE_CHAT_CANCEL_BUTTON;

  useEffect(() => {
    if (visible && type === 'leave') {
      logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.VIEWED_EARLY_LEAVE_MODAL);
    } else if (visible && type === 'delete') {
      logAmplitudeEvent(AMPLITUDE_EVENTS.CHATS.VIEWED_DELETE_CHAT_MODAL);
    }
  }, [type, visible]);

  return (
    <Modal statusBarTranslucent transparent visible={visible}>
      <View className="w-full h-full bg-[#00000060] justify-center items-center p-[10px]">
        <View className="p-[16px] rounded-[16px] flex items-start w-[96%] bg-[#FCF5EB]">
          <Text className="text-[#273051] font-bold text-[18px] mb-[12px]">
            {title}
          </Text>
          <Text className="text-[#494949] mb-[25px] text-[14px]">
            {description}
          </Text>
          <View className="flex-row w-full justify-between space-x-[10px]">
            <TouchableOpacity
              onPress={onConfirm}
              className="px-[24px] grow h-[40px] flex justify-center bg-[#273051] rounded-[8px]">
              <Text className="text-lg text-center font-semibold text-[14px] text-white">
                {confirmText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              className="bg-transparent grow border-[1px] border-[#27305152] px-[24px] h-[40px] flex justify-center rounded-[8px] ">
              <Text className="text-lg text-center font-semibold text-[14px] text-[#273051]">
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
