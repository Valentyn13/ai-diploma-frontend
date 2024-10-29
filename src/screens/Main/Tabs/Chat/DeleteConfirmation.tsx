import React, { FC } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  type: 'leave' | 'delete';
  onConfirm: () => void;
  onCancel: () => void;
};

const LEAVE_CHAT_TITLE = 'עדיין לא סיימנו את הפגישה';
const LEAVE_CHAT_DESCRIPTION = 'נשאר ממש עוד קצת... אתה בטוח שברצונך לצאת?';
const LEAVE_CHAT_CONFIRM_BUTTON = 'אני רוצה לצאת';
const LEAVE_CHAT_CANCEL_BUTTON = 'המשך פגישה';

const DELETE_CHAT_TITLE = `מחק צ'אט`;
const DELETE_CHAT_DESCRIPTION = `האם אתה בטוח שברצונך למחוק את הצ'אט הזה?`;
const DELETE_CHAT_CONFIRM_BUTTON = `כן, אני בטוח`;
const DELETE_CHAT_CANCEL_BUTTON = 'א';

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
  return (
    <Modal transparent visible={visible}>
      <View className="w-full h-full bg-[#00000060] justify-center items-center p-[10px]">
        <View className="p-[16px] rounded-[16px] w-[96%] bg-[#FCF5EB]">
          <Text className="text-[#273051] font-bold text-[18px] mb-[12px]">
            {title}
          </Text>
          <Text className="text-[#494949] mb-[35px] text-[14px]">
            {description}
          </Text>
          <View className="flex-row space-x-[10px]">
            <TouchableOpacity
              onPress={onConfirm}
              className="px-[24px] py-[12px] bg-[#D66366] rounded-[8px]">
              <Text className="text-lg text-white">{confirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              className=" bg-transparent border-[1px] border-[#27305152] px-[24px] py-[12px] rounded-[8px] ">
              <Text className="text-lg text-[#273051]">{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
