import { BoldTitle, ButtonTitleSmall } from '@common/components/Styled';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';

const ModalContainer = styled.View`
  padding: 20px;
  padding-top: 50px;
  background-color: #fdedd6;
  width: 90%;
  border-width: 2px;
  justify-content: center;
  border-radius: 10px;
  align-self: center;
  right: 0;
  left: 20px;
  position: absolute;
  top: 40%;
`;

const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 20px;
`;

const StyledBoldTitle = styled(BoldTitle)`
  line-height: 30px;
  margin-bottom: 30px;
`;

const Button = styled.TouchableOpacity`
  width: 70px;
  padding-vertical: 10px;
  border-radius: 10px;
  margin-horizontal: 10px;
`;

const OkButton = styled(Button)`
  background-color: #273051;
`;

const CancelButton = styled(Button)`
  border-width: 1px;
  background-color: red;
`;

const ModalView = styled.Modal``;

const ReminderPopup = ({ isVisible, dismiss, navigation }) => (
  <ModalView isVisible={isVisible} animationIn="fadeInUp" transparent>
    <ModalContainer>
      <StyledBoldTitle t="באיזו שעה היית מעדיף לתרגל? אנחנו נדאג להזכיר לך 🫶" />
      <Container>
        <OkButton
          onPress={() => {
            dismiss();
            navigation.navigate('Settings');
          }}>
          <ButtonTitleSmall t="אוקיי, בוא ננסה" />
        </OkButton>
        <CancelButton onPress={() => dismiss()}>
          <ButtonTitleSmall t="לא עכשיו" />
        </CancelButton>
      </Container>
    </ModalContainer>
  </ModalView>
);

ReminderPopup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  dismiss: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default ReminderPopup;
